import React from 'react';
import { selectCurrentChatSessionMessages } from '../../../../src/Redux/Slices/homeSlices';
import { useAppSelector } from '../../../../src/Hooks/useAppSelector';

interface OutputBarProps {
  // Reserved for future props.
}

const OutputBar: React.FC<OutputBarProps> = () => {
  const messages = useAppSelector(selectCurrentChatSessionMessages)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
      {messages && messages.map((msg, idx) => (
        <div
          key={`${msg.role}-${msg.createdAt ?? idx}-${idx}`}
          className={`chat-row ${msg.role === 'user' ? 'user' : 'assistant'}`}
        >
          <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'assistant'}`}>
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutputBar;
