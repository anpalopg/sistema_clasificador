import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
const createChat: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  return (
    <>
     <div><Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}></div> 
  );
};

export default createChat;