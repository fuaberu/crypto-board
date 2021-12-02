import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Spin } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
	const { data, isFetching } = useGetExchangesQuery();
	const exchangesList = data?.data?.exchanges;

	if (isFetching) return <Spin size="large" />;

	return (
		<>
			<Row style={{ paddingLeft: 12, paddingRight: 16, textAlign: 'center' }}>
				<Col span={3}>Rank</Col>
				<Col span={6}>Exchanges</Col>
				<Col span={5}>24h Trade Volume</Col>
				<Col span={5}>Markets</Col>
				<Col span={5}>Market Share</Col>
			</Row>
			<Row style={{ textAlign: 'center' }}>
				{exchangesList.map((exchange, index) => (
					<Col span={24} key={index}>
						<Collapse>
							<Panel
								key={exchange.id}
								showArrow={false}
								header={
									<Row key={exchange.id} style={{ width: '100%' }}>
										<Col span={3}>
											<Text>
												<strong>{exchange.rank}</strong>
											</Text>
										</Col>
										<Col span={6}>
											<Avatar className="exchange-image" src={exchange.iconUrl} />
											{'  '}
											<Text>
												<strong>{exchange.name}</strong>
											</Text>
										</Col>
										<Col span={5}>${millify(exchange.volume)}</Col>
										<Col span={5}>{millify(exchange.numberOfMarkets)}</Col>
										<Col span={5}>{millify(exchange.marketShare)}%</Col>
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
