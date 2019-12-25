import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square.js';

class Row extends React.Component {
    render() {
        let row = [];
        for(let x = 0; x < this.props.rowWidth; x++) {
            row.push(<Square key={x} id={x} row={this.props.id} />)
        }
        return (
            <div className="default-row-element">
                {row}
            </div>
        )
    }
}

Row.propTypes = {
    rowWidth: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
}

export default Row;