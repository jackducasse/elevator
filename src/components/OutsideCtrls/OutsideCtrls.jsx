import { find, partial, times } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FLOORS } from '../../constants';

import './OutsideCtrls.css';
import types from '../../utils/types';

export const OutsideCtrls = ({
    backlog,
    addToBacklog,
}) => times(FLOORS, (floor) => {
    const upActive = find(backlog, {floor, direction: 1});
    const downActive = find(backlog, {floor, direction: -1});
    return (
        <div key={floor} className="floor">
            <OutsideCtrl
                floor={floor}
                isUpActive={!!upActive}
                isDownActive={!!downActive}
                onCallElevator={addToBacklog}
            />
        </div>
    )
});
OutsideCtrls.propTypes = {
    backlog: PropTypes.arrayOf(PropTypes.shape(types.request)),
    addToBacklog: PropTypes.func.isRequired,
};
OutsideCtrls.defaultProps = {
    backlog: [],
};

export const OutsideCtrl = ({
    floor,
    isUpActive,
    isDownActive,
    onCallElevator,
}) => (
    <div className="OutsideCtrls">
        <div className="container">
            <div className="floorNo">
                {floor || 'G'}
            </div>
            <div className="buttons">
                {floor !== FLOORS - 1 && (
                    <button
                        className={isUpActive ? 'active' : ''}
                        onClick={partial(onCallElevator, {floor, direction: 1})}
                    >
                        ▲
                    </button>
                )}
                {floor !== 0 && (
                    <button
                        className={isDownActive ? 'active' : ''}
                        onClick={partial(onCallElevator, {floor, direction: -1})}
                    >
                        ▼
                    </button>
                )}
            </div>
        </div>
    </div>
);
OutsideCtrl.propTypes = {
    floor: types.request.floor,
    isUpActive: PropTypes.bool,
    isDownActive: PropTypes.bool,
    onCallElevator: PropTypes.func.isRequired,
};
OutsideCtrl.defaultProps = {
};