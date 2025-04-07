// src/components/DataChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DataChart = ({ data }) => {
    const chartData = {
        labels: data.timestamps,
        datasets: [
            {
                label: 'PLC Data',
                data: data.values,
                fill: false,
                borderColor: '#2c7dff',
                tension: 0.1,
            },
        ],
    };

    return <Line data={chartData} />;
};

export default DataChart;
