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

    // Split by direction, or if no direction (floor selected from inside elevator), by whether the requested floor has already been passed
    const splitBacklog = partition(
        backlog, 
        ({direction, floor}) => (
            (!direction || direction === currentDirection) && 
            ((currentDirection * floor) > (currentDirection * currentPosition.floor))
        )
    );

    // Then order the requests in the right direction (or no direction and on the way) asc or desc depending on the current direction..
    const rightDirection = orderBy(splitBacklog[0], ['floor'], [currentDirection > 0 ? 'asc' : 'desc']);
    // And the others in opposite order.
    const wrongDirection = orderBy(splitBacklog[1], ['floor'], [currentDirection > 0 ? 'desc' : 'asc']);
    
    // Then concat the two back together..
    const orderedBacklog = concat(rightDirection, wrongDirection)

    // And remove any race-condition duplicate requests.
    return uniqBy(orderedBacklog, 'id');
};

module.exports = orderRequests;
