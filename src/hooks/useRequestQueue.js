import { get, head, reject, uniqueId } from 'lodash';
import React from 'react';
import { getDirectionFromFloors } from '../utils/getDirectionFromFloors';
import orderRequests from '../utils/orderRequests';

export const useRequestQueue = ({
    onReachFloor,
} = {}) => {
    const [{
        backlog,
        current,
        position,
    }, setQueue] = React.useState({ backlog: [], current: {}, position: { floor: 0 } });
    const addToBacklog = (request) => {
        const id = uniqueId();
        setQueue(({
            backlog: currBacklog,
            current: currCurrent,
            position: currPosition,
        }) => ({
            backlog: [...currBacklog, {...request, id}],
            current: currCurrent,
            position: currPosition,
        }));
    };
    const startNewRequest = () => setQueue(({
        backlog: currBacklog,
        current: currCurrent,
        position: currPosition,
    }) => {
        const nextRequestFromBacklog = head(orderRequests(backlog, currCurrent, currPosition));
        const nextDirection = getDirectionFromFloors(currPosition.floor, nextRequestFromBacklog.floor);
        const nextPosition = { ...currPosition, direction: nextDirection }
        return {
            backlog: currBacklog,
            current: nextRequestFromBacklog,
            position: nextPosition,
        };
    });
    const onPassFloor = (floor) => setQueue(({
        position: currPosition,
        ...rest
    }) => ({
        ...rest,
        position: {...currPosition, floor},
    }));
    const completeRequest = () => setQueue(({
        backlog: currBacklog,
        current: currCurrent,
        ...rest
    }) => ({
        ...rest,
        backlog: reject(currBacklog, ['id', currCurrent.id]),
        current: {},
    }));

    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        console.log('backlog length changed', backlog.length);
        // Ignore if nothing in backlog, or if a request is already in progress
        if(!backlog.length) return;
        startNewRequest();
    }, [
        // If item added to backlog
        backlog.length,
    ])

    React.useEffect(() => {
        console.log('current request changed', current);
        if(!current.id) {
            console.log('current request has been cleared');
            // 
        } else {
            setIsActive(true);
            setTimeout(() => onPassFloor(position.floor + (position.direction)), 2000); //TODO: const
        }
    }, [
        get(current, 'id'),
    ]);

    React.useEffect(() => {
        console.log('position changed', position);
        if(!isActive) return;
        if(position.floor === current.floor){
            console.log('reached requested floor');
            setIsActive(false);
            onReachFloor();
            completeRequest();
        } else {
            setTimeout(() => onPassFloor(position.floor + (position.direction)), 2000); //TODO: const
        }
    }, [
        position.floor,
    ]);

    return {
        addToBacklog,
        currentRequest: current,
        position,
    }
};