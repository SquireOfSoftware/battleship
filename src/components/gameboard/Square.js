import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
    render() {
        let squareStyle = {};

        return (
            <div 
                className="default-square-element" 
                style={squareStyle}></div>
        )
    }
}

Square.propTypes = {
    // id: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    displayShip: PropTypes.bool
}

Square.defaultProps = {
    displayShip: false
}

export default Square;