import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import millify from 'millify';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineGraph = ({ coinId, period, color }) => {
	const { data, isFetching } = useGetCryptoHistoryQuery({ coinId, period });

	const coinPrice = [];
	const timestamps = [];

	if (isFetching) {
		return 'loading';
	}

	data?.data.history.forEach((element) => {
		coinPrice.push(element.price);
		timestamps.push(new Date(element.timestamp).toLocaleDateString());
	});

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
				labels: {
					fontSize: 1, //point style's size is based on font style not boxed width.
					usePointStyle: false,
				},
			},
		},
	};
	const chartData = {
		labels: timestamps,
		datasets: [
			{
				label: 'Price in USD',
				data: coinPrice,
				fill: false,
				borderWidth: 2,
				pointHoverBackgroundColor: '#000',
				pointRadius: 0,
				borderColor: color,
				backgroundColor: '#f0f2f5',
			},
		],
	};
	return (
		<div>
			<Line options={options} data={chartData} />
		</div>
	);
};

export default LineGraph;
