import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import { database, auth, storage } from '../../../misc/firebase';
import { groupBy, transformToArrWithId } from '../../../misc/helper';
import MessageItems from './MessageItems';
import { Alert, Button, Divider } from 'rsuite';

const PAGE_SIZE = 15;
const messageRef = database.ref('/messages');

const Message = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const selfRef = useRef()

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessage = messages && messages.length > 0;

  
  const loadMessage = useCallback(
    limitToLast => {
      messageRef.off();

      messageRef
        .orderByChild('roomId')
        .equalTo(chatId)
        .limitToLast(limitToLast || PAGE_SIZE)
        .on('value', snap => {
          const data = transformToArrWithId(snap.val());
          setMessages(data);
        });

      setLimit(p => p + PAGE_SIZE);

    },
    [chatId]
  );


  const onLoadMore = useCallback(() => {
    const node = selfRef.current;
    const oldScrollHeight = node.scrollHeight;

    loadMessage(limit);

    const handleScroll = () => {
      const scrollOffset = node.scrollHeight - oldScrollHeight;
      node.scrollTop = scrollOffset;
      node.removeEventListener('scroll', handleScroll);
    };

    node.addEventListener('scroll', handleScroll);
  }, [loadMessage, limit]);


  useEffect(() => {

    loadMessage();


    return () => {
      messageRef.off('value');
    };
  }, [loadMessage]);

  useEffect(() => {
    const node = selfRef.current;
    node.scrollTop = node.scrollHeight;
  }, [messages]);

  
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

  const renderMessage = () => {
    const groups = groupBy(messages, item =>
      new Date(item.createdAt).toDateString()
    );

    const items = [];

    Object.keys(groups).forEach(date => {
      items.push(
        <li key={date} className="text-center mb-1 padded">
          <p>{date}</p>
        </li>
      );

      const msgs = groups[date].map(msg => (
        <div key={msg.id}>
          <MessageItems
            message={msg}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
          <Divider className="mt-2 mb-2" />
        </div>
      ));
      items.push(...msgs);
    });

    return items;
  };

  return (
    <ul ref ={selfRef} className="msg-list custom-scroll">
      {messages && messages.length >=PAGE_SIZE && (
        <li className='text-center mt-2 mb-2'>
          <Button onClick={onLoadMore} color='green'>Load more</Button>
        </li>
      )}
      {isChatEmpty && <li>No Message Yet</li>}
      {canShowMessage && renderMessage()}
    </ul>
  );
};

export default Message;
