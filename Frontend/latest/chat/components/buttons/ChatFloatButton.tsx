import React, { useState } from 'react';
import { CloseOutlined, HistoryOutlined, PlusOutlined, WechatWorkOutlined } from '@ant-design/icons';
import { Button, Drawer, FloatButton } from 'antd';
import Chat from '../pages/Chat';
import ChatSessionHistory from './SideBarOptions/ChatSessionHistory';
import { useAppDispatch } from '../../../src/Hooks/useAppDispatch';
import { useAppSelector } from '../../../src/Hooks/useAppSelector';
import { createChatSession, selectCurretChatSessionId } from '../../../src/Redux/Slices/homeSlices';
import '../chat-ui.css';

const ChatFloatButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const dispatch = useAppDispatch();
  const currentChatSessionId = useAppSelector(selectCurretChatSessionId);

  const handleToggleOpen = () => {
    if (!open && !currentChatSessionId) {
      dispatch(createChatSession());
    }
    setOpen((prev) => !prev);
  };

  const handleCreateNewSession = () => {
    dispatch(createChatSession());
  };

  return (
    <>
      <FloatButton
        className="chat-fab"
        shape="circle"
        type="primary"
        style={{ insetInlineEnd: 40, bottom: 36, width: 56, height: 56, background: '#4C6FFF', color: '#fff', border: 'none' }}
        icon={<WechatWorkOutlined />}
        onClick={handleToggleOpen}
      />

      {open && (
        <>
          <div className="chat-overlay" onClick={() => setOpen(false)} />
          <div className="chat-panel">
            <div className="chat-panel-header">
              <div className="chat-title-wrap">
                <h3 className="chat-title">SKY Assistant </h3>
                <p className="chat-subtitle">Ready to classify your content :) </p>
              </div>

              <div className="chat-header-actions">
                <Button className="chat-history-btn" type="default" icon={<HistoryOutlined />} onClick={() => setShowHistory(true)}>
                  History
                </Button>

                <Button className="chat-new-btn" type="default" icon={<PlusOutlined />} onClick={handleCreateNewSession}>
                  New
                </Button>

                <Button
                  className="chat-close-btn"
                  type="text"
                  shape="circle"
                  icon={<CloseOutlined />}
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                />
              </div>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Chat />
            </div>
          </div>
        </>
      )}

      <Drawer
        title="Chat history"
        placement="right"
        open={showHistory}
        onClose={() => setShowHistory(false)}
        width={360}
        styles={{ body: { padding: 12 } }}
      >
        <ChatSessionHistory />
      </Drawer>
    </>
  );
};

export default ChatFloatButton;
