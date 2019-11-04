import React, { Component } from 'react';
import Chart from "chart.js";

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.myLineChart = null;
    }
    
    componentDidMount() {
        this.buildChart();
    }

    createLineChart = () => {
        return { 
            datasets: Object
                        .keys(this.props.data)
                        .map((key) => {
                            return {
                                label: key,
                                data: this.props.data[key].durations,
                                fill: true
                            }
                        }),
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    }

    createDoughnutChart = () => {
        return {
            datasets: this.props.data,
            labels: ["Red", "Blue"]
        }
    }
    
    buildChart = () => {
        
        if (this.props.chartType === "line") {
            this.tasksDataSet = this.createLineChart();
            console.log(this.tasksDataSet);
        } 
        else if (this.props.chartType === "doughnut") {
            this.tasksDataSet = this.createDoughnutChart();
            console.log(this.tasksDataSet);
        }

        this.myLineChart = new Chart(this.props.id, {
            type: this.props.chartType,
            data: this.tasksDataSet
        });
    }
    
    render() {
        return (
            <div>
                <canvas
                    id={this.props.id }
                    ref={this.chartRef} />
            </div>
        )
    }
}

export default BarChart