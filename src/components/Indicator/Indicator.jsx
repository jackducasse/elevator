import React from 'react';

import './Indicator.css';
import types from '../../utils/types';

const directionMap = {
    1: 'up',
    0: '',
    [-1]: 'down',
};

export const Indicator = ({
    floor,
    direction,
}) => (
    <div className="Indicator">
        <div className="container">
            <div className="floorNo">{floor || 'G'}</div>
            <div 
                className={[
                    'direction',
                    directionMap[direction],
                ].join(' ')}
            />
        </div>
    </div>
);
Indicator.propTypes = {
    floor: types.request.floor,
    direction: types.request.direction,
};
Indicator.defaultProps = {
};