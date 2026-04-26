
import { type FC } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, notification, Tooltip } from 'antd';
import { useAppDispatch } from '../../../../src/Hooks/useAppDispatch';
import { deleteChatSession } from '../../../../src/Redux/Slices/homeSlices';

interface Props {
    chatSessionId: string,
}

const DeleteIcon: FC<Props> = ({ chatSessionId}) => {
 


  const dispatch = useAppDispatch();
    
  const handleDeleteChatSession=  async(id: string) => {
    console.log(id);
     
      dispatch(deleteChatSession({chatSession_id:id}))
       notification.error({
            message: "Info",
            description: "The chat session was deleted successfully.",
            placement: "bottomRight",
        });
  
    }
  
    return (
      <Tooltip title="delete">
        <Button
          onClick={() => {
            handleDeleteChatSession(chatSessionId)
          }}
          shape="circle"
          icon={<DeleteOutlined />}
        />
      </Tooltip>
    )
    
};


export default DeleteIcon;

