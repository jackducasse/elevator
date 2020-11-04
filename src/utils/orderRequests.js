const { orderBy, uniqBy } = require("lodash");
const { getDirectionFromFloors } = require("./getDirectionFromFloors");

const orderRequests = (
    backlog,
    currentRequest,
    currentPosition,
) => {
    const currentDirection = 
        // If called from a floor, direction will be specified. Otherwise..
        currentRequest.direction || currentPosition.direction ||
        // Work out whether the floor the passenger has selected is above or below the current floor.
        getDirectionFromFloors(currentPosition.floor, currentRequest.floor);


    // Order backlog by...
    const orderedBacklog = orderBy(
        backlog, 
        [
            // If a direction is provided on the request (calling the elevator from a floor): check that the direction they want to go is the same way the elevator is currently travelling.
            // If a direction is NOT provided on the request (selecting a floor from inside elevator): check if the selected floor is (before||after, depending on direction) the current elevator position.
            ({direction, floor}) => direction ? 
                direction !== currentDirection : 
                floor < (currentDirection * currentRequest.floor), // TODO: messy and confusing. clean up. //TODO:!!! order direction-less requests by floor number only - NO WEIGHTING FOR DIRECTION. 2 seperate sorts? hmmm
            // Then, order by floor number (asc||desc, depending on direction).
            ({floor}) => currentDirection * floor,
        ],
    );

    console.log('orderedBacklog', orderedBacklog, currentRequest, currentPosition.direction);

    return uniqBy(orderedBacklog, 'id');
};

module.exports = orderRequests;