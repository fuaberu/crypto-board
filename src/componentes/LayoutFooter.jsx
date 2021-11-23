import { Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const LayoutFooter = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			CryptoBoard {new Date().getFullYear()} <br />
			<Space>
				<Link to="/">Home</Link>
				<Link to="/exchanges">Exchanges</Link>
				<Link to="/news">News</Link>
			</Space>
		</div>
	);
};

export default LayoutFooter;
