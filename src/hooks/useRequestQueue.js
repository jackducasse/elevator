import { get, head, reject, uniqueId } from 'lodash';
import React from 'react';
import { getDirectionFromFloors } from '../utils/getDirectionFromFloors';
import orderRequests from '../utils/orderRequests';

export const useRequestQueue = ({
    onReachFloor,
    isDisabled,
} = {}) => {
    const [{
        backlog,
        current,
        position,
    }, setQueue] = React.useState({ backlog: [], current: {}, position: { floor: 0 } });

    const [isActive, setIsActive] = React.useState(false);

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

    const processMovement = () => {
        if(position.floor === current.floor){
            console.log('reached requested floor');
            setIsActive(false);
            onReachFloor();
            completeRequest();
            return;
        } 
        setIsActive(true);
        setTimeout(() => onPassFloor(position.floor + (position.direction)), 2000);
    }


    React.useEffect(() => {
        // Ignore if nothing in backlog, or if elevator movement is disabled (i.e. doors are still open..)
        if(!backlog.length || isDisabled) return;
        startNewRequest();
    }, [
        // If item added to backlog
        backlog.length,
        // Or if disabled status changes (i.e. doors close..)
        isDisabled,
    ])

    React.useEffect(() => {
        // Ignore if current request has been cleared..
        if(!current.id) return;
        processMovement();
    }, [
        // If current request has changed
        get(current, 'id'),
    ]);

    React.useEffect(() => {
        // Ignore if not in motion..
        if(!isActive) return;
        processMovement();
    }, [
        // If moved to new floor
        position.floor,
    ]);


    return {
        addToBacklog,
        backlog,
        currentRequest: current,
        position,
    }
};