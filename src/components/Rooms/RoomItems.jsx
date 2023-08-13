import TimeAgo from 'timeago-react'; 

const RoomItems = ({room}) => {

  const {createdAt, name} = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
<h3 className="text-disappear">{name}</h3>
<TimeAgo
  datetime={new Date(createdAt)} className='font-normal text-black-65'
  
/>
      </div>
      <div className="d-flex align-items-center text-black-70">
<span>No Message Yet...</span>
      </div>
    </div>
  )
}

export default RoomItems
