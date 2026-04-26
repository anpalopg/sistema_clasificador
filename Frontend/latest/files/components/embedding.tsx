import React from 'react';
import { Card, Statistic, Progress, Divider, List, Avatar } from 'antd';
import { ClusterOutlined } from '@ant-design/icons';

export const EmbeddingsInfo: React.FC = () => (
  <Card
    title={<span><ClusterOutlined /> Embeddings</span>}
    bordered={false}
    style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
  >
    <Statistic title="Dimensiones vectoriales" value={768} />
    <Divider />
    <Progress percent={75} status="active" strokeColor="#1890ff" />
    <List
      itemLayout="horizontal"
      dataSource={['Lorem ipsum dolor sit amet', 'Ut enim ad minim veniam', 'Quis nostrud exercitation']}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta avatar={<Avatar icon={<ClusterOutlined />} />} title={item} />
        </List.Item>
      )}
    />
  </Card>
);

export default EmbeddingsInfo;
