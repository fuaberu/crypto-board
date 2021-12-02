import React, { useState } from 'react';
import { Avatar, Button, Card, Col, Layout, Row, Typography } from 'antd';
import { useGetNewsQuery } from '../services/newsApi';
import moment from 'moment';

const News = () => {
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
		<Layout style={{ alignItems: 'center' }}>
			<Typography.Title level={2}>Crypto News</Typography.Title>
			<Row gutter={[16, 16]}>
				{data &&
					data?.value.map((el, index) => {
						return (
							<Col xs={24} sm={12} ls={8} key={index}>
								<a href={el.url} target="_blank" rel="noreferrer">
									<Card
										style={{ height: '100%' }}
										bodyStyle={{
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between',
										}}
										hoverable
									>
										<Typography.Title level={4} style={{ whiteSpace: 'pre-wrap' }}>
											{el.name}
										</Typography.Title>
										<Typography.Paragraph style={{}}>
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
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<Avatar src={el.provider[0].image.thumbnail.contentUrl} />
												<Typography.Paragraph style={{ marginBottom: 0 }}>
													{el.provider[0].name}
												</Typography.Paragraph>
											</div>
											<Typography.Paragraph style={{ marginBottom: 0 }}>
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
				style={{ width: 105, marginTop: 16 }}
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
