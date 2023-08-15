import { Divider } from "rsuite"
import {useRef,useState,useEffect} from 'react';
import CreateRoomBtn from "../Rooms/CreateRoomBtn"
import DashboardToggle from "./DashboardToggle"
import ChatRoom from "../Rooms/ChatRoom"

const Sidebar = () => {

  const topSidebarRef = useRef();
const [height,setHeight] = useState(0);
useEffect(() =>{
  if(topSidebarRef.current){
    setHeight(topSidebarRef.current.scrollHeight)
  }
},[topSidebarRef])

  return (
    <div className="h-100 pt-2">

      <div ref = {topSidebarRef}>
        <DashboardToggle/>
        <CreateRoomBtn/>
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoom aboveElHeight = {height}/>
    </div>
  )
}

export default Sidebar
