import React from 'react';
import { FileTextOutlined, TagOutlined, OrderedListOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const MetricsPanel: React.FC = () => (
  <Row gutter={16}>
    <Col span={6}>
      <Card variant="borderless">
        <Statistic
          title="Documents Analyzed"
          value={14}
          prefix={<FileTextOutlined />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card variant="borderless">
        <Statistic
          title="Keywords Extracted"
          value={129}
          prefix={<TagOutlined />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card variant="borderless">
        <Statistic
          title="Summaries Generated"
          value={34}
          prefix={<OrderedListOutlined />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card variant="borderless">
        <Statistic
          title="Citations Identified"
          value={72}
          prefix={<DatabaseOutlined />}
        />
      </Card>
    </Col>
  </Row>
);

export default MetricsPanel;
