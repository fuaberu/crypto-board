import React from 'react';
import CryptoCoins from '../componentes/CryptoCoins';
import CryptosStats from '../componentes/CryptosStats';

const Home = ({ theme }) => {
	return (
		<>
			<CryptosStats theme={theme} />
			<CryptoCoins theme={theme} />
		</>
	);
};

export default Home;
