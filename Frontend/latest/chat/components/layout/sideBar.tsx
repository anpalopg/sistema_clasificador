import React, { useState } from 'react';
import { PlusOutlined, HistoryOutlined, MenuOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, Layout, Divider } from 'antd';
import ChatSessionHistory from '../buttons/SideBarOptions/ChatSessionHistory';
import CreateNewChat from '../buttons/SideBarOptions/CreateNewChat';

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={260}
      collapsedWidth={60}
      style={{
        background: '#001529',
        padding: '12px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >


      {/* Íconos de arriba */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: 16 }}>
        <FullscreenOutlined style={{ color: '#fff', fontSize: 18 }} />
        <PlusOutlined style={{ color: '#fff', fontSize: 18 }} />
        <MenuOutlined style={{ color: '#fff', fontSize: 18 }} />
      </div>

      
      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />


      <Button
        type="default"
        icon={<PlusOutlined />}
        style={{ marginBottom: 12, width: '100%' }}
      >
        {!collapsed && "Create new chat"}
      </Button>


  <Button
          type="default"
          icon={<HistoryOutlined />}
          style={{ marginBottom: 12, width: '100%' }}
        >
          {!collapsed && "History"}
        </Button> 
    
      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <CreateNewChat /> 
      <ChatSessionHistory />
    </Sider>
  );
};

export default SideBar;
