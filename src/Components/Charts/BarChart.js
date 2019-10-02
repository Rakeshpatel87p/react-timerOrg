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
        console.log(myChartRef);
        const sortedTasks = this.props.data;
        let tasksDataSet = [];
        if (this.props.type === "line") {
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

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: this.props.type,
            data: {
                datasets: tasksDataSet
            }
            /*
            labels: ['Red', 'Yellow', 'Blue'],
            data: {
                //Bring in data
                datasets: [10, 20, 30]
            },
            options: {
                //Customize chart options
            }
            */
        });
    }
    
    render() {
        return (
            <div>
                <canvas
                id={`myChart${this.i}`}
                ref={this.chartRef} />
            </div>
        )
    }
}

export default BarChart