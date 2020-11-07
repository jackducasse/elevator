import React from 'react';
import PropTypes from 'prop-types';

import './Doors.css';

export const Doors = ({
    open,
}) => (
    <div className="Doors">
        <div className="container">
            <div className={['entry', open ? 'open' : ''].join(' ')}>
                <div className="door left" />
                <div className="door right" />
            </div>
        </div>
    </div>
);
Doors.propTypes = {
    open: PropTypes.bool,
};
Doors.defaultProps = {
};