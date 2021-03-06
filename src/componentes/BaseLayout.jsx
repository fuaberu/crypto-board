import React, { useEffect, useState } from 'react';
import { Layout, Switch } from 'antd';

import { Navbar, LayoutFooter } from './';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../features/theme/themeSlice';

const { Footer, Content, Sider } = Layout;

const BaseLayout = () => {
	const [collapsed, setCollapsed] = useState(true);
	const [screenSize, setScreenSize] = useState(null);

	//check if screen resize
	useEffect(() => {
		const handelScreen = () => setScreenSize(window.innerWidth);
		window.addEventListener('resize', handelScreen());

		handelScreen();

		return () => window.removeEventListener('resize', handelScreen());
	}, []);

	const state = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	const menuCollapsed = {
		position: 'fixed',
		minHeight: '100%',
		zIndex: 1,
		transition: 'all 0.2s',
	};

	const smallMenu = {
		position: 'fixed',
		height: '100%',
		zIndex: 1,
	};
	return (
		<Layout>
			<Sider
				collapsible
				onCollapse={() => setCollapsed(!collapsed)}
				defaultCollapsed={true}
				collapsedWidth={50}
				theme={state.value}
				style={collapsed ? menuCollapsed : screenSize < 768 ? smallMenu : {}}
			>
				<Navbar collapsed={collapsed} screenSize={screenSize} />
			</Sider>
			<Layout>
				<Switch
					onClick={() => dispatch(change(state))}
					checked={state.value === 'dark' ? true : false}
					style={{ width: '35px', position: 'absolute', top: 15, right: 15 }}
				/>
				<Content
					style={
						screenSize < 768 ? { marginLeft: 50 } : collapsed ? { marginLeft: 50 } : {}
					}
				>
					<Layout
						style={
							state.value === 'dark'
								? { backgroundColor: '#011930', minHeight: '100vh', padding: '30px' }
								: { minHeight: '100vh', padding: '30px' }
						}
					>
						{/* insert child here */}
						<Outlet />
					</Layout>
				</Content>
				<Footer
					style={
						state.value === 'dark' ? { backgroundColor: '#011930', color: '#fff' } : {}
					}
				>
					<LayoutFooter />
				</Footer>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
