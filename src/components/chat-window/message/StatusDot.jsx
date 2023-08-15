
import { usePresence } from '../../../misc/custom-hook';
import { Whisper, Tooltip, Badge } from 'rsuite';

const getColor = presence => {
  if (!presence) {
    return 'gray';
  }

  switch (presence.state) { // Removed 'this.' before 'state'
    case 'online':
      return 'green';
    case 'offline':
      return 'red';
    default:
      return 'gray';
  }
};

const getText = presence => {
  if (!presence) {
    return 'Unknown state';
  }
  return presence.state === 'online' // Removed extra space after 'online'
    ? 'Online'
    : `Last active ${new Date(presence.last_changed).toLocaleDateString()}`;
};

const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);
  return (
    <Whisper
      placement="top"
      controlId="control-id-hover"
      trigger="hover"
      speaker={<Tooltip>{getText(presence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ backgroundColor: getColor(presence)}}
      />
    </Whisper>
  );
};

export default PresenceDot;
