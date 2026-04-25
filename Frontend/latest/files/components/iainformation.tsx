import React from 'react';
import { Card, Statistic, Progress, Divider, List, Avatar } from 'antd';
import { RobotOutlined } from '@ant-design/icons';

export const IAInfo: React.FC = () => (
  <Card
    title={<span><RobotOutlined /> Inteligencia Artificial</span>}
    bordered={false}
    style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
  >
    <Statistic title="Precisión del modelo" value={97.5} suffix="%" />
    <Divider />
    <Progress percent={97} status="active" strokeColor="#722ed1" />
    <List
      itemLayout="horizontal"
      dataSource={['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor']}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta avatar={<Avatar icon={<RobotOutlined />} />} title={item} />
        </List.Item>
      )}
    />
  </Card>
);

export default IAInfo;
