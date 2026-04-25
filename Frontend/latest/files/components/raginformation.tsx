import React from 'react';
import { Card, Statistic, Progress, Divider, List, Avatar } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';

export const RAGInfo: React.FC = () => (
  <Card
    title={<span><DatabaseOutlined /> RAG</span>}
    bordered={false}
    style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
  >
    <Statistic title="Consultas procesadas" value={124} />
    <Divider />
    <Progress percent={90} status="active" strokeColor="#52c41a" />
    <List
      itemLayout="horizontal"
      dataSource={['Lorem ipsum dolor sit amet', 'Duis aute irure dolor', 'Excepteur sint occaecat']}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta avatar={<Avatar icon={<DatabaseOutlined />} />} title={item} />
        </List.Item>
      )}
    />
  </Card>
);

export default RAGInfo;
