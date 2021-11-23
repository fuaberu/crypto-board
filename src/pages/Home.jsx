import React from 'react';
import CryptoCoins from '../componentes/CryptoCoins';
import CryptosStats from '../componentes/CryptosStats';

const Home = () => {
	return (
		<>
			<CryptosStats />
			<CryptoCoins />
		</>
	);
};

export default Home;
