import React from 'react';
import { Col, Row, Spin, Typography } from 'antd';
import millify from 'millify';
import { useGetCryptosStatsQuery } from '../services/cryptoApi';

const CryptosStats = ({ theme }) => {
	const { data, isLoading } = useGetCryptosStatsQuery();

	const colorStyle = {
		color: theme === 'dark' ? '#a6adb4' : '',
		textAlign: 'center',
	};
	const textStyle = {
		color: theme === 'dark' ? '#a6adb4' : '',
		fontSize: 30,
	};

	if (isLoading) return <Spin size="large" />;

	return (
		<>
			<Typography.Title style={colorStyle} level={2}>
				Global Cryptocurrencies stats
			</Typography.Title>
			<Row style={{ marginBottom: 30 }} gutter={[16, 16]}>
				<Col style={{ textAlign: 'center' }} xs={12} sm={5} lg={5}>
					<Typography.Title style={colorStyle} level={5}>
						Number of coins
					</Typography.Title>
					<Typography.Text style={textStyle}>
						{data ? millify(data?.data.totalCoins) : null}
					</Typography.Text>
				</Col>
				<Col style={{ textAlign: 'center' }} xs={12} sm={4} lg={5}>
					<Typography.Title style={colorStyle} level={5}>
						Markets
					</Typography.Title>
					<Typography.Text style={textStyle}>
						{data ? millify(data?.data.totalMarkets) : null}
					</Typography.Text>
				</Col>
				<Col style={{ textAlign: 'center' }} xs={12} sm={4} lg={4}>
					<Typography.Title style={colorStyle} level={5}>
						Exchanges
					</Typography.Title>
					<Typography.Text style={textStyle}>
						{data ? millify(data?.data.totalExchanges) : null}
					</Typography.Text>
				</Col>
				<Col style={{ textAlign: 'center' }} xs={12} sm={4} lg={5}>
					<Typography.Title style={colorStyle} level={5}>
						24h Volume
					</Typography.Title>
					<Typography.Text style={textStyle}>
						{data ? millify(data?.data.total24hVolume) : null}
					</Typography.Text>
				</Col>
				<Col style={{ textAlign: 'center' }} xs={12} sm={4} lg={5}>
					<Typography.Title style={colorStyle} level={5}>
						Market Cap
					</Typography.Title>
					<Typography.Text style={textStyle}>
						{data ? millify(data?.data.totalMarketCap) : null}
					</Typography.Text>
				</Col>
			</Row>
		</>
	);
};

export default CryptosStats;
