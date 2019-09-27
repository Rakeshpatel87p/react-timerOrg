import React, { Component } from 'react';
import BarChart from './Charts/BarChart';

class UserStats extends Component {
    constructor(props) {
        super(props);

        this.myData = [
            {
              "name": "A",
              "value": 46
            },
            {
              "name": "B",
              "value": 87
            },
          ];
    }
    render() {

        return (
            <div>
                <BarChart 
                    data={this.myData}
                    title="Work Over Time"
                    color="#70CAD1"
                />
            </div>
        )
    }
}

export default UserStats