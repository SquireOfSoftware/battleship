import React, {Component} from 'react';

class DeploymentCounter extends Component {
    constructor(props) {
        super(props);

        this.id = this.props.id;
        this.link = this.props.link;
        this.reference = this.props.reference;

        this.name = this.reference.name;
        this.value = this.reference.symbol;
        this.counter = this.reference.size;
    }

    decrementCount = (event) => {
        if (this.counter > -1) {
            this.counter--;
        } else {
            this.counter = 0;
        }
    }

    incrementCount = (event) => {
        if (this.counter < this.props.maxCount) {
            this.counter++;
        } else {
            this.counter = this.reference.size;
        }
    }

    handleRadioSelection = (e) => {
        this.props.handleRadioSelection(this.reference, this.counter);
    }

    render() {
        return (
            <div className="ship-checkbox">
                <input type='radio'
                       id={this.id}
                       name={this.link}
                       value={this.value}
                       onClick={this.handleRadioSelection}/>
                <label htmlFor={this.id}>
                       {this.name} squares left to place: {this.counter}
                </label>
            </div>
        )
    }
}

export default DeploymentCounter;