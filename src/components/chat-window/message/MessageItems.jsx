import  { memo } from 'react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtn from './ProfileInfoBtn';
import PresenceDot from './StatusDot';
import { Divider } from 'rsuite';
import { useHover } from '../../../misc/custom-hook';
import IconBtn from './IconBtn';

const MessageItems = ({ message }) => {
  const { author, createdAt, text } = message;

  const [selfRef,isHovered]= useHover()
  return (
    <li className={`padded mt-1 cursor-pointer ${isHovered ? 'bg-black-02' :''}`} ref={selfRef}>
   <Divider className='mt-1 mb-1' />
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
        {...(true ? {color: 'red'}:{})}
       isVisible 
       iconName ="heart" 
       tooltip = 'Like this message'
        onClick={()=>{}}
        badgeContent ={0}
        />
      </div>
      <div>
        <span className=" ml-2  word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItems);
