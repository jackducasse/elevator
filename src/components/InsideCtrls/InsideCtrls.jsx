import { find, findIndex, times } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FLOORS } from '../../constants';

import './InsideCtrls.css';

export const InsideCtrls = ({
    activeFloors,
    onOpenDoors,
    onCloseDoors,
    onSelectFloor,
}) => (
    <div className="InsideCtrls">
        <div className="row doorCtrls">
            <button onClick={onOpenDoors}>Open</button>
            <button onClick={onCloseDoors}>Close</button>
        </div>
        <div className="row floorCtrls">
            {times(FLOORS, (index) => {
                // TODO: move out into component.
                const floor = FLOORS - index - 1;
                const isActive = !!find(activeFloors, {floor});
                return (
                    <button 
                        className={isActive ? 'active' : ''} 
                        onClick={() => onSelectFloor({floor})}
                    >
                        {floor || 'G'}
                    </button>
                );
            })}
        </div>
    </div>
);
// OutsideCtrls.propTypes = {
//     floor: PropTypes.number.isRequired,
//     onCallElevator: PropTypes.func.isRequired,
// };