import { memo } from 'react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtn from './ProfileInfoBtn';
import PresenceDot from './StatusDot';
import { Divider } from 'rsuite';
import { useHover, useMediaQuery } from '../../../misc/custom-hook';
import IconBtn from './IconBtn';
import { auth } from '../../../misc/firebase';

const MessageItems = ({ message, handleLike }) => {
  const { author, createdAt, text ,likes,likeCount} = message;

  const [selfRef, isHovered] = useHover();
  const isMobile = useMediaQuery(('(max width :992px)'))

const canShowIcon = isMobile || isHovered
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid)

  return (
    <li
      className={`padded mt-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
      <Divider className="mt-1 mb-1" />
      <div className="d-flex align-items-center font-border">
        <PresenceDot uid={author.uid} />

        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtn
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        />

        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-65 ml-2"
        />

        <IconBtn
          {...(isLiked ? { color: 'red' } : {})}
          isVisible = {canShowIcon}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
      </div>
      <div>
        <span className=" ml-2  word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItems);
