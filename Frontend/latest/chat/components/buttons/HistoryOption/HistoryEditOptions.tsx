import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import DeleteIcon from '../HistoryOption/DeleteIcon';
import RenameIcon from '../HistoryOption/RenameIcon';

interface HistoryOptionsProps {
  chatSessionId: string;
  currentName: string;
}

const HistoryOptions: React.FC<HistoryOptionsProps> = ({ chatSessionId, currentName }) => {
  const items: MenuProps['items'] = [
    {
      key: 'delete',
      label: <DeleteIcon chatSessionId={chatSessionId} />,
    },
    {
      key: 'rename',
      label: <RenameIcon chatSessionId={chatSessionId} newName={currentName} />,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default HistoryOptions;
