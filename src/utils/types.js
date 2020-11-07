import PropTypes from 'prop-types';

const request = {
    floor: PropTypes.number.isRequired,
    direction: PropTypes.number,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

const types = {
    request,
}

export default types;
