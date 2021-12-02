import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, News, Detaile, Exchanges } from './pages';
import BaseLayout from './componentes/BaseLayout';
import CryptoCoins from './componentes/CryptoCoins';

function App() {
	// const [theme, setTheme] = useState('Light');

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<BaseLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/exchanges" element={<Exchanges />} />
					<Route path="/news" element={<News />} />
					<Route path="/cryptocurrencies" element={<CryptoCoins />} />
					<Route path="/crypto/:id" element={<Detaile />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
