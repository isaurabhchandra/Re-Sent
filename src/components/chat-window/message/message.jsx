import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { database, auth, storage } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helper';
import MessageItems from './MessageItems';
import { Alert, Divider } from 'rsuite';

const Message = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessage = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = database.ref('/messages');
    messageRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);
      });
    return () => {
      messageRef.off('value');
    };
  }, [chatId]);

  const handleLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;

    const messageRef = database.ref(`/messages/${msgId}`);
    let alertMsg;
    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'Like Removed';
        } else {
          msg.likeCount += 1;

          if (!msg.likes) {
            msg.likes = {};
          }

          msg.likes[uid] = true;
          alertMsg = 'Like added';
        }
      }
      return msg;
    });
    Alert.info(alertMsg, 4000);
  }, []);

  const handleDelete = useCallback(
    async (msgId, file) => {
      if (!window.confirm('Delete this message?')) {
        return;
      }
  
      const isLast = messages[messages.length - 1].id === msgId;
  
      const updates = {};
      updates[`/messages/${msgId}`] = null;
  
      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }
      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }
  
      try {
        await database.ref().update(updates);
        Alert.info('Message has been deleted');
      } catch (error) {
        return Alert.error(error.message);
      }
  
      if (file) {
        try {
        //  console.log('File URL:', file.url); 
          const fileRef = storage.refFromURL(file.url);
          await fileRef.delete();
         // console.log('File deleted successfully'); // Log successful deletion
        } catch (error) {
        //  console.error('Error deleting file:', error); // Log deletion error
          Alert.error(error.message);
        }
      }
    },
    [chatId, messages]
  );
  

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Message Yet</li>}
      {canShowMessage &&
        messages.map(msg => (
          <div key={msg.id}>
            <MessageItems
              message={msg}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
            <Divider className='mt-2 mb-2' />
          </div>
        ))}
    </ul>
  );
};

export default Message;
