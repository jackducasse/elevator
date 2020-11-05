const { orderBy, uniqBy, partition, concat } = require("lodash");
const { getDirectionFromFloors } = require("./getDirectionFromFloors");

const orderRequests = (
    backlog,
    currentRequest,
    currentPosition,
) => {
    const currentDirection = 
        currentPosition.direction ||
        // Work out whether the floor the passenger has selected is above or below the current floor.
        getDirectionFromFloors(currentPosition.floor, currentRequest.floor);

    console.log('currentDirection', currentDirection);

    // Split by direction
    const splitBacklog = partition(
        backlog, 
        ({direction, floor}) => (
            (direction ? direction === currentDirection : true) && 
            ((currentDirection * floor) > (currentDirection * currentPosition.floor))
        )
    );
    const rightDirection = orderBy(splitBacklog[0], ['floor'], [currentDirection > 0 ? 'asc' : 'desc']);
    const wrongDirection = orderBy(splitBacklog[1], ['floor'], [currentDirection > 0 ? 'desc' : 'asc']);
    // Order backlog by...
    const orderedBacklog = concat(rightDirection, wrongDirection)
    
    console.log('orderedBacklog', orderedBacklog);

    return uniqBy(orderedBacklog, 'id');
};

module.exports = orderRequests;
