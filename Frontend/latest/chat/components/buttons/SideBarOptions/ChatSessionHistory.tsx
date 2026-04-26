import { useEffect, type FC } from 'react';
import { Input, Space } from 'antd';
import { currentChatSessionUpdated, fetchChatSessions, selectChatSessions } from '../../../../src/Redux/Slices/homeSlices';
import { useAppSelector } from '../../../../src/Hooks/useAppSelector';
import { useAppDispatch } from '../../../../src/Hooks/useAppDispatch';
import HistoryOptions from '../HistoryOption/HistoryEditOptions';

const ChatSessionHistory: FC = () => {
  const chatSessions = useAppSelector(selectChatSessions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChatSessions());
  }, [dispatch]);

  return (
    <div style={{ padding: '10px' }}>
      {chatSessions.map((session) => (
        <div
          key={session.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
          onClick={() => dispatch(currentChatSessionUpdated(session))}
        >
          <Input
            type="text"
            placeholder="Session name"
            variant="underlined"
            defaultValue={session.name}
            readOnly
            style={{
              backgroundColor: '#F4F4F4',
              flex: 1,
            }}
          />

          <Space>
            <HistoryOptions chatSessionId={session.id} currentName={session.name} />
          </Space>
        </div>
      ))}
    </div>
  );
};

export default ChatSessionHistory;
