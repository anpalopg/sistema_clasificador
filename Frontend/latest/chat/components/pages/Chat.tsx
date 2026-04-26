import { Layout, theme, Divider } from 'antd';
import ContentArea from '../layout/contentArea';
import { useAppSelector } from '../../../src/Hooks/useAppSelector';
import { selectCurrentChatSessionMessages, selectCurretChatSession, selectCurretChatSessionId } from '../../../src/Redux/Slices/homeSlices';



const { Content } = Layout;

const Chat: React.FC = () => {
  const chatSessionId = useAppSelector(selectCurretChatSessionId);
  const currentMessages = useAppSelector(selectCurrentChatSessionMessages);
  const currenChatSession = useAppSelector(selectCurretChatSession);

  theme.useToken();

  return (
    <Layout className="chat-shell">
      <Layout style={{ minHeight: 0 }}>
        <Content className="chat-content-card">
          {currenChatSession && <span className="chat-session-line">{currenChatSession.name}</span>}
          <Divider style={{ margin: '10px 0 12px', borderColor: '#dce8fb' }} />
          {currentMessages.length === 0 && chatSessionId && (
            <div className="chat-welcome">How can I help you?</div>
          )}

          <div className="chat-main" />
          <ContentArea />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Chat;
