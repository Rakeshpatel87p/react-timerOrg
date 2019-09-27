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
        const { data, average, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
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
                ]
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