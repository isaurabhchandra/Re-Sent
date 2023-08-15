import { memo} from 'react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtn from './ProfileInfoBtn';
import PresenceDot from './StatusDot';
import { Divider } from 'rsuite';
import { useHover, useMediaQuery } from '../../../misc/custom-hook';
import IconBtn from './IconBtn';
import { auth } from '../../../misc/firebase'
// import { useCurrentRoom } from '../../../context/current-roomcontext';


const MessageItems = ({ message, handleLike,handleDelete }) => {
  const { author, createdAt, text ,likes,likeCount} = message;

  // const isAdmin = useCurrentRoom(v => v.isAdmin)
  // const admins = useCurrentRoom(v=> v.admins)

  // const isMsgAuthorAdmin = admins.includes(author.uid)
  const isAuthor = auth.currentUser.uid === author.uid
  // const canGrantAdmin = isAdmin && !isAuthor;


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
          classNamep="p-0 ml-1 text-black"
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
          isVisible = {canShowIcon}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtn
        
          isVisible = {canShowIcon}
          iconName="close"
          tooltip="Delete this message"
          onClick={() => handleDelete(message.id)}
        
        />
        )}
      </div>
      <div>
        <span className=" ml-2  word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItems);
