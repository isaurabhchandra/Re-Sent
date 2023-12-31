import { memo } from 'react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtn from './ProfileInfoBtn';
import PresenceDot from './StatusDot';

import { useHover, useMediaQuery } from '../../../misc/custom-hook';
import IconBtn from './IconBtn';
import { auth } from '../../../misc/firebase';
import ImgBtnModal from './ImgBtnModal';
// import { useCurrentRoom } from '../../../context/current-roomcontext';

const renderFileMessage = file => {
  if (file.contentType.includes('image')) {
    return (
      <div className="height-220">
        <ImgBtnModal src={file.url} fileName={file.name} />
      </div>
    );
  }


if(file.contentType.includes('audio')){

  return(<audio controls>
<source src = {file.url} type = "audio/mp3"/>

Your Browser is not support the audio element.
  </audio>
  )
}


  return <a href={file.url}>DownLoad{file.name}</a>;
};

const MessageItems = ({ message, handleLike, handleDelete }) => {
  const { author, createdAt, text, file, likes, likeCount } = message;

  // const isAdmin = useCurrentRoom(v => v.isAdmin)
  // const admins = useCurrentRoom(v=> v.admins)

  // const isMsgAuthorAdmin = admins.includes(author.uid)
  const isAuthor = auth.currentUser.uid === author.uid;
  // const canGrantAdmin = isAdmin && !isAuthor;

  const [selfRef, isHovered] = useHover();
  const isMobile = useMediaQuery('(max width :992px)');

  const canShowIcon = isMobile || isHovered;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mt-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
     
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
        {/* {canGrantAdmin && (
            <Button block onClick={() => {}} color="blue">
              {isMsgAuthorAdmin
                ? 'Remove admin permission'
                : 'Give admin in this room'}
            </Button>
          )}
        </ProfileInfoBtn> */}

        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-65 ml-2"
        />

        <IconBtn
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcon}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtn
            isVisible={canShowIcon}
            iconName="close"
            tooltip="Delete this message"
            onClick={() => handleDelete(message.id ,file)}
          />
        )}
      </div>
      <div>
        {text && <span className=" ml-3  word-break-all">{text}</span>}
        {file && renderFileMessage(file)}
      </div>
    </li>
  );
};

export default memo(MessageItems);
