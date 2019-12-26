import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
    render() {
        let value = this.props.value;
        return (
            <div 
                className="default-square-element"
                onClick={() => this.props.processClick(this.props.coords)}
            >
                {value}
            </div>
        )
    }
}

Square.propTypes = {
    displayShip: PropTypes.bool,
    processClick: PropTypes.func.isRequired,
    coords: PropTypes.object
}

Square.defaultProps = {
    displayShip: false
}

export default Square;