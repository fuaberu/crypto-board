import React from 'react';
import { Layout, Switch } from 'antd';

import { Navbar, LayoutFooter } from './';
import { Outlet } from 'react-router';

const { Footer, Content, Sider } = Layout;

const BaseLayout = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider theme="light">
				<Navbar />
			</Sider>
			<Layout>
				<Switch
					style={{ width: '35px', position: 'absolute', top: '5px', right: '5px' }}
				/>
				<Content>
					<Layout style={{ padding: '30px' }}>
						{/* insert child here */}
						<Outlet />
					</Layout>
				</Content>
				<Footer>
					<LayoutFooter />
				</Footer>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
