
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import Top from '../../components/chat-window/top/topcontent';
import Message from '../../components/chat-window/message/message';
import Bottom from '../../components/chat-window/bottom/bottomcontent';
import { useRooms } from '../../context/Room.context';
import { CurrentRoomProvider } from '../../context/current-roomcontext';
import { transformToArr } from '../../misc/helper';
import { auth } from '../../misc/firebase';

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
  }

  const { name, description } = currentRoom;

const admins = transformToArr(currentRoom.admins)
const isAdmin = admins.includes(auth.currentUser.uid)

  const currentRoomData = {
    name,
    description,
    admins,
    isAdmin,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <Top />
      </div>
      <div className="chat-middle">
        <Message />
      </div>
      <div className="chat-bottom">
        <Bottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
