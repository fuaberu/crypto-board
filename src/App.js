import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, News, Detaile, Exchanges } from './pages';
import BaseLayout from './componentes/BaseLayout';
import CryptoCoins from './componentes/CryptoCoins';

function App() {
	const theme = useSelector((state) => state.theme.value);
	console.log(theme);
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<BaseLayout />}>
					<Route path="/" element={<Home theme={theme} />} />
					<Route path="/exchanges" element={<Exchanges theme={theme} />} />
					<Route path="/news" element={<News theme={theme} />} />
					<Route path="/cryptocurrencies" element={<CryptoCoins theme={theme} />} />
					<Route path="/crypto/:id" element={<Detaile theme={theme} />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
