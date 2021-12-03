import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Input, Row, Spin, Typography } from 'antd';
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
	const { data, isLoading } = useGetCryptosCoinsQuery(moreCryptos ? 100 : 12);

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

	if (isLoading) return <Spin size="large" />;

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography.Title
					level={2}
					style={
						theme === 'dark'
							? { marginBottom: 30, color: '#a6adb4' }
							: { marginBottom: 30 }
					}
				>
					Cryptocurrencies
				</Typography.Title>

				{pathname === '/cryptocurrencies' ? (
					<Input
						placeholder="Search"
						value={search}
						maxLength={400}
						onChange={(e) => setSearch(e.target.value)}
						style={
							theme === 'dark'
								? { marginBottom: 30, backgroundColor: '#001529', color: '#a6adb4' }
								: {
										marginBottom: 30,
								  }
						}
					/>
				) : null}
			</div>

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
			{pathname !== '/cryptocurrencies' ? (
				<Button
					style={{ marginTop: 16, marginLeft: '50%', transform: 'translatex(-50%)' }}
					type="primary"
					onClick={() => setMoreCryptos(!moreCryptos)}
				>
					Show more
				</Button>
			) : null}
		</div>
	);
};

export default CryptoCoins;
