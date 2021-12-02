import React from 'react';
import { Layout, Switch } from 'antd';

import { Navbar, LayoutFooter } from './';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../features/theme/themeSlice';

const { Footer, Content, Sider } = Layout;

const BaseLayout = () => {
	const state = useSelector((state) => state.theme);
	console.log(state);
	const dispatch = useDispatch();
	return (
		<Layout>
			<Sider theme={state.value}>
				<Navbar />
			</Sider>
			<Layout>
				<Switch
					onClick={() => dispatch(change(state))}
					checked={state.value === 'dark' ? true : false}
					style={{ width: '35px', position: 'absolute', top: '5px', right: '5px' }}
				/>
				<Content>
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
