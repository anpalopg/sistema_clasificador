import { Layout, theme } from 'antd';
import OutputBar from '../buttons/InputOptions/OutputBar';
import { selectCurrentChatSessionMessages } from '../../../src/Redux/Slices/homeSlices';
import { useAppSelector } from '../../../src/Hooks/useAppSelector';
import InputBar from '../buttons/InputOptions/InputBar';

const { Content } = Layout;

const ContentArea: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const currentMessages = useAppSelector(selectCurrentChatSessionMessages);

  const contentStyle: React.CSSProperties = {
    padding: 0,
    margin: 0,
    minHeight: 0,
    background: 'transparent',
    borderRadius: borderRadiusLG,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  };

  return (
    <Content style={contentStyle}>

      <div className="chat-messages">
        {currentMessages && <OutputBar />}
      </div>
      <div>
        <InputBar />
      </div>
    </Content>
  );
};

export default ContentArea;
