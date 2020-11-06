import { partial } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FLOORS } from '../../constants';

import './OutsideCtrls.css';

export const OutsideCtrls = ({
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
                        Up
                    </button>
                )}
                {floor !== 0 && (
                    <button
                        className={isDownActive ? 'active' : ''}
                        onClick={partial(onCallElevator, {floor, direction: -1})}
                    >
                        Down
                    </button>
                )}
            </div>
        </div>
    </div>
);
// OutsideCtrls.propTypes = {
//     floor: PropTypes.number.isRequired,
//     onCallElevator: PropTypes.func.isRequired,
// };