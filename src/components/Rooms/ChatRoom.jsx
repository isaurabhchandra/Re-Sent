import { Nav, Loader } from 'rsuite';
import RoomItems from './RoomItems';
import { useRooms } from '../../context/Room.context';
import { Link, useLocation } from 'react-router-dom';

const ChatRoom = ({ aboveElHeight }) => {
  const rooms = useRooms();

  const location = useLocation();

  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{ height: `calc(100% - ${aboveElHeight}px)` }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${room.id}`}
            key={room.id}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItems room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default ChatRoom;
