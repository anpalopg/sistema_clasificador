import React from 'react';
import { Flex, Input } from 'antd';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

const inputBar: React.FC = () => (
  <Flex vertical gap={32}>
    <TextArea showCount maxLength={100} onChange={onChange} placeholder="can resize" />
  </Flex>
);

export default inputBar;