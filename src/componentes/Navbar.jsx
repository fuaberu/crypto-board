import React from 'react';
import { Menu, Typography } from 'antd';
import {
	AccountBookOutlined,
	FundViewOutlined,
	HomeOutlined,
	ReadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ collapsed, screenSize }) => {
	const theme = useSelector((state) => state.theme.value);
	console.log(collapsed, screenSize);

	return (
		<>
			{!collapsed ? (
				<div className="logo-container">
					<Typography.Title level={2} style={{ margin: '0.3em' }}>
						<Link to="/">CryptoBoard</Link>
					</Typography.Title>
				</div>
			) : null}
			<Menu theme={theme}>
				<Menu.Item key={1} icon={<HomeOutlined />}>
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item key={2} icon={<AccountBookOutlined />}>
					<Link to="/exchanges">Exchanges</Link>
				</Menu.Item>
				<Menu.Item key={3} icon={<ReadOutlined />}>
					<Link to="/news">News</Link>
				</Menu.Item>
				<Menu.Item key={4} icon={<FundViewOutlined />}>
					<Link to="/cryptocurrencies">Cryptocurrencies</Link>
				</Menu.Item>
			</Menu>
		</>
	);
};

export default Navbar;
