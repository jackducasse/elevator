import React from 'react';

import './Indicator.css';

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
)