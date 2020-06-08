import React, { Component } from 'react';
import SetupBoard from '../gameboard/SetupBoard.js';

class DeploymentRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <SetupBoard />
            </div>
        )
    }
}

export default DeploymentRoom;