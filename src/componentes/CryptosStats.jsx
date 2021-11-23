import React from 'react';
import { Card, Layout, Statistic } from 'antd';
import millify from 'millify';
import { useGetCryptosStatsQuery } from '../services/cryptoApi';

const CryptosStats = () => {
	const { data, isLoading } = useGetCryptosStatsQuery();

	const cardStyle = {
		width: '20%',
		textAlign: 'center',
		padding: '2rem 0',
	};

	return (
		<Layout style={{ marginBottom: 30 }}>
			<Card
				title="Global Cryptocurrencies stats"
				style={{ width: '100%' }}
				loading={isLoading}
			>
				<Card.Grid style={cardStyle}>
					<Statistic
						title="Number of coins"
						value={data ? millify(data?.data.totalCoins) : null}
					/>
				</Card.Grid>
				<Card.Grid style={cardStyle}>
					<Statistic
						title="Markets"
						value={data ? millify(data?.data.totalMarkets) : null}
					/>
				</Card.Grid>
				<Card.Grid style={cardStyle}>
					<Statistic
						title="Exchanges"
						value={data ? millify(data?.data.totalExchanges) : null}
					/>
				</Card.Grid>
				<Card.Grid style={cardStyle}>
					<Statistic
						title="24h Volume"
						value={data ? millify(data?.data.total24hVolume) : null}
					/>
				</Card.Grid>
				<Card.Grid style={cardStyle}>
					<Statistic
						title="Market Cap"
						value={data ? millify(data?.data.totalMarketCap) : null}
					/>
				</Card.Grid>
			</Card>
		</Layout>
	);
};

export default CryptosStats;
