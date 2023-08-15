import {useState,useEffect,useCallback} from 'react'
import { useParams } from 'react-router'
import { database,auth } from '../../../misc/firebase'
import { transformToArrWithId } from '../../../misc/helper'
import MessageItems from './MessageItems'
import { Alert } from 'rsuite'


const Message = () => {
const {chatId} = useParams()
  const [messages,setMessages] = useState(null)


const isChatEmpty = messages && messages.length ===0;
const canShowMessage = messages && messages.length >0;


  useEffect(()=>{
    const messageRef =database.ref('/messages')
    messageRef.orderByChild('roomId').equalTo(chatId).on('value',(snap)=>{

      const data = transformToArrWithId(snap.val())
      setMessages(data)
    })
return()=>{
  messageRef.off('value')
}
  },[chatId])

  

const handleLike = useCallback(async(msgId) =>{

  const {uid} = auth.currentUser;
  
    const messageRef = database.ref(`/messages/${msgId}`)
    let alertMsg;
    await messageRef.transaction(msg =>{
  if(msg){
    if(msg.likes && msg.likes[uid]){
      msg.likeCount -= 1
      msg.likes[uid] = null;
      alertMsg = " Like Removed"
    }else {
  
      msg.likeCount +=1;
  
      if(!msg.likes){
        msg.likes = {};
  
      }
  
      msg.likes[uid] = true;
      alertMsg ='Like added'
  
    }
  }
  return msg;
  
    })
  Alert.info(alertMsg,4000)
  },[])
  

  return (
    <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li>No Message Yet</li>}
      {canShowMessage && messages.map(msg => <MessageItems key={msg.id} message = {msg} handleLike={handleLike}/>)}
    
    </ul>
  )
}

export default Message
