import React, { useState } from 'react';
import { Avatar, Button, Card, Col, Layout, Row, Typography } from 'antd';
import { useGetNewsQuery } from '../services/newsApi';
import moment from 'moment';

const News = ({ theme }) => {
	const [count, setCount] = useState(6);
	const [disabled, setDisabled] = useState(false);

	const { data, isFetching } = useGetNewsQuery({
		category: 'Cryptocurrency',
		count: count,
	});

	const increseCount = () => {
		if (data.totalEstimatedMatches > count + 6) {
			setCount(count + 6);
		} else {
			setCount(data.totalEstimatedMatches);
			setDisabled(true);
		}
	};
	return (
		<Layout
			style={
				theme === 'dark'
					? { backgroundColor: '#011930', color: '#fff', alignItems: 'center' }
					: { alignItems: 'center' }
			}
		>
			<Typography.Title style={theme === 'dark' ? { color: '#fff' } : {}} level={2}>
				Crypto News
			</Typography.Title>
			<Row gutter={[16, 16]}>
				{data &&
					data?.value.map((el, index) => {
						return (
							<Col xs={24} sm={12} ls={8} key={index}>
								<a href={el.url} target="_blank" rel="noreferrer">
									<Card
										style={
											theme === 'dark'
												? { height: '100%', backgroundColor: '#092036' }
												: { height: '100%' }
										}
										bodyStyle={{
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between',
										}}
										hoverable
									>
										<Typography.Title
											level={4}
											style={theme === 'dark' ? { color: '#fff' } : {}}
										>
											{el.name}
										</Typography.Title>
										<Typography.Paragraph
											style={theme === 'dark' ? { color: '#a6adb4' } : {}}
										>
											{el.description}
										</Typography.Paragraph>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginTop: 'auto',
											}}
										>
											<div
												style={
													theme === 'dark'
														? { color: '#a6adb4', display: 'flex', alignItems: 'center' }
														: { display: 'flex', alignItems: 'center' }
												}
											>
												<Avatar src={el.provider[0].image.thumbnail.contentUrl} />{' '}
												<Typography.Paragraph
													style={
														theme === 'dark'
															? { color: '#a6adb4', marginBottom: 0 }
															: { marginBottom: 0 }
													}
												>
													{el.provider[0].name}
												</Typography.Paragraph>
											</div>
											<Typography.Paragraph
												style={
													theme === 'dark'
														? { color: '#a6adb4', marginBottom: 0 }
														: { marginBottom: 0 }
												}
											>
												{moment(el.datePublished).fromNow()}
											</Typography.Paragraph>
										</div>
									</Card>
								</a>
							</Col>
						);
					})}
			</Row>
			<Button
				onClick={() => increseCount()}
				style={{ minWidth: 105, marginTop: 16 }}
				type="primary"
				disabled={disabled}
				loading={isFetching}
			>
				Show More
			</Button>
		</Layout>
	);
};

export default News;
