import { times } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FLOORS } from '../../constants';

export const InsideCtrls = ({
    onOpenDoors,
    onCloseDoors,
    onSelectFloor,
}) => (
    <div className="InsideCtrls">
        <button onClick={onOpenDoors}>Open</button>
        <button onClick={onCloseDoors}>Close</button>
        {times(FLOORS, (index) => {
            // TODO: move out into component.
            const floor = FLOORS - index - 1;
            return (
                <button floor={floor} onClick={() => onSelectFloor({floor})}>{floor}</button>
            );
          })}
    </div>
);
// OutsideCtrls.propTypes = {
//     floor: PropTypes.number.isRequired,
//     onCallElevator: PropTypes.func.isRequired,
// };