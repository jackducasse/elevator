import { partial } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FLOORS } from '../../constants';

export const OutsideCtrls = ({
    floor,
    onCallElevator,
}) => (
    <div className="OutsideCtrls">
        {floor !== FLOORS - 1 && (<button onClick={partial(onCallElevator, {floor, direction: 1})}>Up</button>)}
        {floor !== 0 && (<button onClick={partial(onCallElevator, {floor, direction: -1})}>Down</button>)}
    </div>
);
// OutsideCtrls.propTypes = {
//     floor: PropTypes.number.isRequired,
//     onCallElevator: PropTypes.func.isRequired,
// };