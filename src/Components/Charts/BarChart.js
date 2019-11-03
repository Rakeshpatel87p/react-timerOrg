import React, { Component } from 'react';
import Chart from "chart.js";

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.myLineChart = null;
        let tasksDataSet = [];
    }
    
    componentDidMount() {
        this.buildChart();
    }

    createLineChart = () => {
        return { 
            datasets: Object
                        .keys(this.props.data.sortedTasks)
                        .map((key) => {
                            return {
                                label: key,
                                data: this.props.data.sortedTasks[key].durations,
                                fill: true
                            }
                        }),
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    }

    createDoughnutChart = () => {
        return {
            datasets: this.props.data.sortedTasks,
            labels: ["Red", "Blue"]
        }
    }
    
    buildChart = () => {
        const {sortedTasks, chartType} = this.props.data;
        if (chartType === "line") {
            this.tasksDataSet = this.createLineChart()
        } 
        else if (chartType === "doughnut") {
            this.tasksDataSet = this.createDoughnutChart();
        }

        this.myLineChart = new Chart(this.props.id, {
            type: chartType,
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