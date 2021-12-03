import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Spin } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = ({ theme }) => {
	const { data, isFetching } = useGetExchangesQuery();
	const exchangesList = data?.data?.exchanges;

	if (isFetching) return <Spin size="large" />;

	const darkModeColor = {
		color: theme === 'dark' ? '#a6adb4' : '',
	};

	return (
		<>
			<Typography.Title level={2} style={darkModeColor}>
				Exchanges
			</Typography.Title>
			<Row style={{ paddingLeft: 12, paddingRight: 16, textAlign: 'center' }}>
				<Col span={3}>
					<Typography.Title level={5} style={darkModeColor}>
						Rank
					</Typography.Title>
				</Col>
				<Col span={6}>
					<Typography.Title level={5} style={darkModeColor}>
						Exchanges
					</Typography.Title>
				</Col>
				<Col span={5}>
					<Typography.Title level={5} style={darkModeColor}>
						24h Trade Volume
					</Typography.Title>
				</Col>
				<Col span={5}>
					<Typography.Title level={5} style={darkModeColor}>
						Markets
					</Typography.Title>
				</Col>
				<Col span={5}>
					<Typography.Title level={5} style={darkModeColor}>
						Market Share
					</Typography.Title>
				</Col>
			</Row>
			<Row style={{ textAlign: 'center' }}>
				{exchangesList.map((exchange, index) => (
					<Col span={24} key={index}>
						<Collapse
							style={
								theme === 'dark'
									? { backgroundColor: '#092036', borderColor: '#000', color: '#fff' }
									: {}
							}
						>
							<Panel
								key={exchange.id}
								showArrow={false}
								style={theme === 'dark' ? { borderColor: '#000', color: '#fff' } : {}}
								header={
									<Row key={exchange.id} style={{ width: '100%' }}>
										<Col span={3}>
											<Text style={darkModeColor}>
												<strong>{exchange.rank}</strong>
											</Text>
										</Col>
										<Col span={6}>
											<Avatar className="exchange-image" src={exchange.iconUrl} />
											{'  '}
											<Text style={darkModeColor}>
												<strong>{exchange.name}</strong>
											</Text>
										</Col>
										<Col style={darkModeColor} span={5}>
											${millify(exchange.volume)}
										</Col>
										<Col style={darkModeColor} span={5}>
											{millify(exchange.numberOfMarkets)}
										</Col>
										<Col style={darkModeColor} span={5}>
											{millify(exchange.marketShare)}%
										</Col>
									</Row>
								}
							>
								{HTMLReactParser(exchange.description || '')}
								Register at{' '}
								<a href={exchange.websiteUrl} target="_blank" rel="noreferrer">
									{exchange.name}.
								</a>
							</Panel>
						</Collapse>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Exchanges;
