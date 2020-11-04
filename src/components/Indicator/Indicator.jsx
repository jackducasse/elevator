import React from 'react';

import './Indicator.css';

const directionMap = {
    1: 'Up',
    0: '',
    [-1]: 'Down',
};

export const Indicator = ({
    floor,
    direction,
}) => (
    <div className="Indicator">
        <span>{floor}</span>&nbsp;
        <span>{directionMap[direction]}</span>
    </div>
)