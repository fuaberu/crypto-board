import React from 'react';
import { Line } from 'react-chartjs-2';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
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
import { Spin } from 'antd';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineGraph = ({ coinId, period, color, theme }) => {
	const { data, isFetching } = useGetCryptoHistoryQuery({ coinId, period });

	const coinPrice = [];
	const timestamps = [];

	if (isFetching) return <Spin size="large" />;

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
				pointHoverBackgroundColor: theme === 'dark' ? '#fff' : '#000',
				pointRadius: 0,
				borderColor: color || '#1890ff',
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
