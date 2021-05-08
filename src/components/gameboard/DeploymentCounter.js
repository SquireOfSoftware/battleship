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

        this.isRotated = false;
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

    startDataTransfer = (e) => {
        let sourceElement = e.currentTarget;
        let x, y = 0;
        if (sourceElement.offsetWidth > sourceElement.offsetHeight) {
            y = 1;
            x = Math.ceil((e.clientX - sourceElement.offsetLeft) / 25);
            console.log("mouse x: " + e.clientX +
            " img width: " + sourceElement.offsetWidth +
            " img offset: " + sourceElement.offsetLeft +
            " " + (e.clientX - sourceElement.offsetLeft) / 25);
        } else {
            x = 1;
            y = Math.floor((e.clientY - sourceElement.offsetTop) / 25);
        }
        console.log(x + ", " + y);

        let imgObject = {
            reference: this.reference,
            rotation: 90,
            dragStartCoords: {
                x: x,
                y: y
            }
        };
        e.target.style.opacity = 0.4;
        e.dataTransfer.setData("shipReference", JSON.stringify(imgObject));
    }

    endDataTransfer = (e) => {
        e.target.style.opacity = 1;
    }

    render() {
        return (
            <div className="ship-checkbox">
                <label>{this.name}</label>
                <img src={this.reference.img}
                     onDragStart={this.startDataTransfer}
                     onDragEnd={this.endDataTransfer}/>
            </div>
        )
    }
}

export default DeploymentCounter;