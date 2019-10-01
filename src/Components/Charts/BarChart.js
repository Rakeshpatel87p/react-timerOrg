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
        const { sessionTime, task } = this.props.data;

        const sampleData = {
            "coding" : {
                sessionTimes: ['Thurs May 4th', 'Friday May 20th'],
                durations: [60, 20, 30]
            },

            "cooking" : {
                sessionTimes: ['Thurs May 4th', 'Friday May 20th'],
                durations: [30, 10, 5]
            },

            "ironing" : {
                sessionTimes: ['Thurs May 4th', 'Friday May 20th'],
                durations: [10, 10, 45]
            }
        
        }
        const sortedTasks = []
        const durations = Object.keys(sampleData).map((key) => {
            return sampleData[key].durations
        })

        if (typeof myLineChart !== "undefined") myLineChart.destroy();
        //{sessionTime: mins, task: 'test', timeStampStart: 0}
        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: sessionTime,
                datasets: Object.keys(sampleData).map((key) => {
                    return {
                        label: key,
                        data: sampleData[key].durations,
                        fill: true,
                        borderColor: "#6610f2"
                    }
                })
                /*datasets: [
                    {
                        label: "Sales",
                        data: [4010, 3600, 2900, 3550, 3800, 2900, 3000, 3500, 4000, 3700, 3550, 3800],
                        fill: false,
                        borderColor: "#6610f2"
                    },
                    {
                        label: "National Average",
                        data: [600, 400, 600, 550, 700, 500, 600, 700, 500, 550, 600, 700],
                        fill: false,
                        borderColor: "#E0E0E0"
                    }
                ]*/
            },
            options: {
                //Customize chart options
            }
        });
    }
    
    render() {
        return (
            <div>
                <canvas
                id="myChart" 
                ref={this.chartRef} />
            </div>
        )
    }
}

export default BarChart