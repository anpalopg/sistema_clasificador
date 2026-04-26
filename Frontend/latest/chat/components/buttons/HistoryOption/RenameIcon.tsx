
import { type FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, notification, Tooltip } from 'antd';
import { useAppDispatch } from '../../../../src/Hooks/useAppDispatch';
import { updateChatSessionName } from '../../../../src/Redux/Slices/homeSlices';


interface Props {
    chatSessionId: string;
    newName: string;
}


const RenameIcon: FC<Props> = ({ chatSessionId, newName}) => {

 
  const dispatch =  useAppDispatch();

  const handleEditChatSessionName = async (id: string, name: string) => {
 
    dispatch(updateChatSessionName({chatSession_id: id, chatSession:{name}}))
    notification.info({
      message: "Info",
      description: "The chat session was renamed successfully.",
      placement: "bottomRight",
    });
  };


  return (
    <Tooltip title="rename">
      <Button
        onClick={() => {
          handleEditChatSessionName(chatSessionId, newName)
        }}
        shape="circle"
        icon={<EditOutlined />}
      />
    </Tooltip>
  )
};


export default RenameIcon;
