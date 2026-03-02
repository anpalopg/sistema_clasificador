import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
const plusOption: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  return (
    <>
     <div><Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}></div> 
  );
};

export default plusOption;