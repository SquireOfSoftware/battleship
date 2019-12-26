import React from 'react';
import PropTypes from 'prop-types';

class Ship extends React.Component {
    render() {
        return (
            <div>{this.props.name}</div>
        )
    }
}

Ship.propTypes = {
    name: PropTypes.oneOf(Object.keys(types)),
    type: PropTypes.oneOf(Object.keys(types)),
    coord: PropTypes.object
}

const types = {
    Carrier: {
        size: 5
    },
    Battleship: {
        size: 4
    },
    Cruiser: {
        size: 3
    },
    Submarine: {
        size: 3
    },
    Destroyer: {
        size: 2
    }
}

export default Ship;