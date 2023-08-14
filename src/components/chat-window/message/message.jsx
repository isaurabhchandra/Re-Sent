import {useState,useEffect} from 'react'
import { useParams } from 'react-router'
import { database } from '../../../misc/firebase'
import { transformToArrWithId } from '../../../misc/helper'
import MessageItems from './MessageItems'

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
  return (
    <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li>No Message Yet</li>}
      {canShowMessage && messages.map(msg => <MessageItems key={msg.id} message = {msg}/>)}
    
    </ul>
  )
}

export default Message
