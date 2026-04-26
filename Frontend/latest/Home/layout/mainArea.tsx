import React, { useState } from 'react';
import {
  HomeOutlined,
  FileOutlined,
  GitlabFilled,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Drawer, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import UploadDocument from '../components/uploadDocument';
import MetricsPanel from '../components/cards';
import DataTable from '../components/table';
import FilesPagination from '../../files/components/pagination';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [

  getItem('Home', '1', <HomeOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('SKY admin', '3'),
    getItem('SKY user', '4'),
    getItem('SKY guest', '5'),
  ]),
  getItem('Information', '9', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentYear = new Date().getFullYear();
  const isFilesRoute = location.pathname === '/files' || location.pathname.startsWith('/files/');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      setDrawerOpen(false);
      setSelectedUser(null);
      navigate('/');
    } else if (e.key === '9') {
      setDrawerOpen(false);
      navigate('/files');
    } else {
      const userKeys = ['3', '4', '5'];
      if (userKeys.includes(e.key)) {
        const userNames: { [key: string]: string } = {
          '3': 'SKY admin',
          '4': 'SKY user',
          '5': 'SKY guest',
        };
        setSelectedUser(userNames[e.key]);
        setDrawerOpen(true);
      }
    }
  };

  const selectedMenuKey = isFilesRoute ? '9' : '1';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedMenuKey]} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: isFilesRoute ? 'Files' : 'Home' }]} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<GitlabFilled />}
              style={{ marginBottom: 16, color: '#b74bf6', backgroundColor: '#d7dde6' }}
            />
            <h1>{isFilesRoute ? 'Files' : 'Sistem Knoledge Yard'}</h1>

            {isFilesRoute && <FilesPagination />}

            {!isFilesRoute && (
              <>
                <UploadDocument />
                <MetricsPanel />
                <DataTable />
              </>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{currentYear} Created by Andrea Lopez
        </Footer>
      </Layout>

      <Drawer
        title={`${selectedUser} - Workspace`}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={800}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2>{selectedUser}'s Dashboard</h2>
        </div>
      </Drawer>

      
    </Layout>
  );
};

export default App;
