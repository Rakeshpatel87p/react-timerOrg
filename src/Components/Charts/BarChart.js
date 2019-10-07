import React, { Component } from 'react';
import Chart from "chart.js";

let myLineChart;

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }
    
    componentDidMount() {
        this.buildChart();
    }
    
    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const sortedTasks = this.props.data;
        let tasksDataSet = [];
        
        if (this.props.chartType === "line") {
            tasksDataSet = Object.keys(sortedTasks).map((key) => {
                return {
                    label: key,
                    data: sortedTasks[key].durations,
                    fill: true
                }
            })
        } else {
            tasksDataSet = sortedTasks
        }

        myLineChart = new Chart(this.props.id, {
            type: this.props.chartType,
            data: {
                datasets: tasksDataSet
            }
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