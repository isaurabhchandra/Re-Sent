import ProfileAvatar from '../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';
const MessageItems = ({ message }) => {
  const { author, createdAt, text } = message;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-item-center font-border mb-1">
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <span className='ml-2'>{author.name}</span>
        <TimeAgo
         datetime={
          createdAt  // Changed 'DataTransfer' to 'Date'
          }
          className="font-normal text-black-65 ml-2"
        
        />
      </div>

      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItems;
