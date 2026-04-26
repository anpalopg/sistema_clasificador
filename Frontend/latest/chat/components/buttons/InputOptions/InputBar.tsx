import { Input } from 'antd';
import SendChat from './sendChat';
import { useAppDispatch } from '../../../../src/Hooks/useAppDispatch';
import { useAppSelector } from '../../../../src/Hooks/useAppSelector';
import { currentMessageUpdated, selectCurrentMessage } from '../../../../src/Redux/Slices/homeSlices';
import Upload from './upload';

const { TextArea } = Input;

const InputBar: React.FC = () => {

  const dispatch = useAppDispatch();
  const message = useAppSelector(selectCurrentMessage);
  return (
      <div className="chat-composer">
        <TextArea
          className="chat-input"
          value={message}
          onChange={(e) => dispatch(currentMessageUpdated(e.target.value))}
          placeholder="Type your message here..."
          autoSize={{ minRows: 2, maxRows: 5 }}
        />
        <div className="chat-send-row">
          <Upload />
          <SendChat />
        </div>
      </div>
  );
};

export default InputBar;