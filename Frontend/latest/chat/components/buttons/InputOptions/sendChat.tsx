import React from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { selectCurrentMessage, selectCurretChatSessionId, sendMessage } from '../../../../src/Redux/Slices/homeSlices';
import { useAppSelector } from '../../../../src/Hooks/useAppSelector';
import { useAppDispatch } from '../../../../src/Hooks/useAppDispatch';

const SendChat: React.FC = () => {

 
  const chatSessionId = useAppSelector(selectCurretChatSessionId)
  const message = useAppSelector(selectCurrentMessage)
  const dispatch = useAppDispatch();
  const isDisabled = !chatSessionId || !message.trim();
 
  const handleClick = () => {
    if (chatSessionId && message.trim()) {
      dispatch(sendMessage({ chatSession_id: chatSessionId, message: message.trim() }))
    }
  };

  return (
    <Tooltip title="Send message">
      <Button
        className="chat-send-btn"
        shape="circle"
        icon={<SendOutlined />}
        onClick={handleClick}
        disabled={isDisabled}
      />
    </Tooltip>
  );
};

export default SendChat;
