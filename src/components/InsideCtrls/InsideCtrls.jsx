import { find, times } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FLOORS } from '../../constants';

import './InsideCtrls.css';
import types from '../../utils/types';

export const InsideCtrls = ({
    activeFloors,
    onOpenDoors,
    onCloseDoors,
    onSelectFloor,
}) => (
    <div className="InsideCtrls">
        <div className="container">
            <div className="row doorCtrls">
                <button onClick={onCloseDoors}>▶◀ </button>
                <button onClick={onOpenDoors}>◀▶</button>
            </div>
            <div className="row floorCtrls">
                {times(FLOORS, (index) => {
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
    </div>
);
InsideCtrls.propTypes = {
    activeFloors: PropTypes.arrayOf(PropTypes.shape(types.request)),
    onOpenDoors: PropTypes.func.isRequired,
    onCloseDoors: PropTypes.func.isRequired,
    onSelectFloor: PropTypes.func.isRequired,
};