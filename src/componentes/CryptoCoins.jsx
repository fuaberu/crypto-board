import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Input, Row, Space, Typography } from 'antd';
import millify from 'millify';
import { useGetCryptosCoinsQuery } from '../services/cryptoApi';
import { Link, useLocation } from 'react-router-dom';

const CryptoCoins = ({ theme }) => {
	//current location
	let { pathname } = useLocation();
	//iniciate the fetching
	const [moreCryptos, setMoreCryptos] = useState(
		pathname === '/cryptocurrencies' ? true : false
	);
	//search input
	const [search, setSearch] = useState('');
	//fetched data
	const { data, isLoading } = useGetCryptosCoinsQuery(moreCryptos ? 100 : 10);

	const [displayData, setDisplayData] = useState();

	useEffect(() => {
		const filteredData = data?.data.coins.filter((coin) =>
			coin?.name.toLowerCase().includes(search.toLowerCase())
		);
		setDisplayData(filteredData);
	}, [data, search]);

	const darkModeColor = {
		color: theme === 'dark' ? '#fff' : '',
	};

	return (
		<div>
			{pathname !== '/cryptocurrencies' ? (
				<Space
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						marginBottom: 15,
					}}
				>
					<Typography.Title
						level={2}
						style={
							theme === 'dark'
								? { marginBottom: 'auto', color: '#a6adb4' }
								: { marginBottom: 'auto' }
						}
					>
						Top Cryptocurrencies
					</Typography.Title>
					<Button type="primary" onClick={() => setMoreCryptos(!moreCryptos)}>
						Show more
					</Button>
				</Space>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography.Title
						level={2}
						style={
							theme === 'dark'
								? { marginBottom: 5, color: '#a6adb4' }
								: { marginBottom: 5 }
						}
					>
						Cryptocurrencies
					</Typography.Title>

					<Input
						placeholder="Search"
						value={search}
						maxLength={400}
						onChange={(e) => setSearch(e.target.value)}
						style={{
							marginBottom: 30,
						}}
					/>
				</div>
			)}

			<Row gutter={[24, 24]}>
				{displayData &&
					displayData.map((coin, index) => (
						<Col xs={24} sm={12} lg={6} key={index}>
							<Link to={`/crypto/${coin.id}`}>
								<Card
									style={
										theme === 'dark'
											? {
													width: '100%',
													backgroundColor: '#092036',
													borderColor: '#000',
											  }
											: { width: '100%' }
									}
									headStyle={
										theme === 'dark' ? { borderColor: '#000', color: '#fff' } : {}
									}
									title={`${coin.rank}. ${coin.name}`}
									hoverable
									extra={<Avatar src={coin.iconUrl} />}
									loading={isLoading}
								>
									<Typography.Text style={darkModeColor} type="strong">
										Current Price:{' '}
										<Typography.Text style={darkModeColor}>
											{millify(coin.price)}
										</Typography.Text>
									</Typography.Text>
									<br />
									<Typography.Text style={darkModeColor} type="strong">
										Today:{' '}
										<Typography.Text type={coin.change >= 0 ? 'success' : 'danger'}>
											{millify(coin.change)}%
										</Typography.Text>
									</Typography.Text>
									<br />
									<Typography.Text style={darkModeColor} type="strong">
										Market Cap:{' '}
										<Typography.Text style={darkModeColor}>
											{millify(coin.marketCap)}
										</Typography.Text>
									</Typography.Text>
								</Card>
							</Link>
						</Col>
					))}
			</Row>
		</div>
	);
};

export default CryptoCoins;
