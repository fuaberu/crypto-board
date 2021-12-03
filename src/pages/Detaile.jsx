import React, { useState } from 'react';
import { Card, Layout, Select, Space, Spin, Typography } from 'antd';
import { useParams } from 'react-router';
import LineGraph from '../componentes/LineGraph';
import { useGetCryptosDetailesQuery } from '../services/cryptoApi';
import { SocialIcon } from 'react-social-icons';
import parse from 'html-react-parser';
import millify from 'millify';
import {
	CheckOutlined,
	DollarCircleOutlined,
	ExclamationCircleOutlined,
	NumberOutlined,
	StopOutlined,
	TrophyOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const Detaile = ({ theme }) => {
	const [period, setPeriod] = useState('24h');

	//current location
	let { id } = useParams();

	const { data, isFetching } = useGetCryptosDetailesQuery(id);

	if (isFetching) return <Spin size="large" />;

	const gridStyle = {
		width: window.innerWidth > 992 ? '33.3333%' : '50%',
		heigth: '100%',
		textAlign: 'center',
		boxShadow:
			theme === 'dark'
				? '1px 0 0 0 #000000, 0 1px 0 0 #000000, 1px 1px 0 0 #000000, 1px 0 0 0 #000000 inset, 0 1px 0 0 #000000 inset'
				: '',
	};

	const color = {
		color: theme === 'dark' ? '#a6adb4' : '',
	};

	return (
		<Layout
			style={theme === 'dark' ? { backgroundColor: '#011930', color: '#a6adb4' } : {}}
		>
			<Typography.Title
				level={2}
				style={{ color: theme === 'dark' ? '#a6adb4' : '', textAlign: 'center' }}
			>{`${data?.data.coin.name} (${data?.data.coin.slug})`}</Typography.Title>
			<Space style={{ justifyContent: 'space-between' }}>
				<Select defaultValue="24h" style={{ width: 120 }} onChange={(e) => setPeriod(e)}>
					<Option value="3h">3 hours</Option>
					<Option value="24h">24 hours</Option>
					<Option value="7d">7 days</Option>
					<Option value="30d">30 days</Option>
					<Option value="3m">3 months</Option>
					<Option value="1y">1 year</Option>
					<Option value="3y">3 years</Option>
					<Option value="5y">5 years</Option>
				</Select>
				<Typography.Text style={color} type="strong">
					Today:{' '}
					<Typography.Text type={data?.data.coin.change >= 0 ? 'success' : 'danger'}>
						{millify(data?.data.coin.change)}%
					</Typography.Text>
				</Typography.Text>
			</Space>
			<LineGraph
				coinId={id}
				period={period}
				color={data?.data.coin.color}
				theme={theme}
			/>

			<Card
				title={`${data?.data.coin.name} Statistics`}
				headStyle={{ textAlign: 'center', color: theme === 'dark' ? '#a6adb4' : '' }}
				style={
					theme === 'dark'
						? { backgroundColor: '#001529', borderColor: '#000', marginTop: 16 }
						: { marginTop: 16 }
				}
				loading={isFetching}
			>
				<Card.Grid style={gridStyle}>
					<Typography.Text style={color}>
						<DollarCircleOutlined /> {`USD Price: ${millify(data?.data.coin.price)}`}
					</Typography.Text>
				</Card.Grid>
				<Card.Grid style={gridStyle}>
					<Typography.Text style={color}>
						<NumberOutlined /> {`Rank: ${data?.data.coin.rank}`}
					</Typography.Text>
				</Card.Grid>
				<Card.Grid style={gridStyle}>
					<Typography.Text style={color}>
						<DollarCircleOutlined /> {`24h Volume: ${millify(data?.data.coin.volume)}`}
					</Typography.Text>
				</Card.Grid>
				<Card.Grid style={gridStyle}>
					<Typography.Text style={color}>
						<DollarCircleOutlined /> {`Market Cap: ${millify(data?.data.coin.marketCap)}`}
					</Typography.Text>
				</Card.Grid>
				<Card.Grid style={gridStyle}>
					<Typography.Text style={color}>
						<TrophyOutlined />{' '}
						{`All Time High: ${millify(data?.data.coin.allTimeHigh.price)}`}
					</Typography.Text>
				</Card.Grid>
				<Card.Grid style={gridStyle}>
					<Typography.Text style={color}>
						<ExclamationCircleOutlined /> {'Aproved Suplly: '}{' '}
						{data?.data.coin.approvedSupply ? <CheckOutlined /> : <StopOutlined />}
					</Typography.Text>
				</Card.Grid>
			</Card>
			<Space direction="vertical" style={{ marginTop: 16 }}>
				<Typography.Title level={4} style={color}>
					{`What is ${data?.data.coin.name}?`}
				</Typography.Title>
				{parse(data?.data.coin.description)}
			</Space>
			<Space direction="horizontal">
				{data?.data.coin.socials?.map((el, index) => {
					return <SocialIcon network={el.type} key={index} url={el.url} />;
				})}
			</Space>
		</Layout>
	);
};

export default Detaile;
