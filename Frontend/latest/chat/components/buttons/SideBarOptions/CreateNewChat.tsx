import { use, useEffect, type FC } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { notification } from "antd";
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { createChatSession, currentChatSessionUpdated, selectCurretChatSession } from '../../../../redux/slices/chatSessionSlice';
import { current } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../../hooks/useAppSelector';

const CreateNewChat: FC = () => {
  const dispatch = useAppDispatch();

  const currentChatSession= useAppSelector(selectCurretChatSession);
  const handleCreateChatsession = () => {
    dispatch(createChatSession());


    notification.success({
      message: "Info",
      description: "The chat session was created successfully.",
      placement: "bottomRight",
    });
  };
 
  return (
    <Button
      onClick={handleCreateChatsession}
      icon={<PlusOutlined />}
      type="primary"
      size="large"
      style={{
        width: '15%',         
        height: '40px',
        fontSize: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#BE95FF',
        gap: '10px',
      }}
    >

    </Button>
  );
};

export default CreateNewChat;
