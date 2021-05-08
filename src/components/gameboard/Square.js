import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
    render() {
        let value = this.props.value;
        return (
            <div 
                className="default-square-element"
                onClick={() => this.props.processClick(this.props.coords)}
                onDrop={(event) => {
                        console.log(event);
                        this.props.processDrop(event);
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }
                onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
            >
                {value}
            </div>
        )
    }
}

Square.propTypes = {
    processClick: PropTypes.func.isRequired,
    coords: PropTypes.object
}

export default Square;