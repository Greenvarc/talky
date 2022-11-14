import { unstable_getServerSession } from 'next-auth'
import React from 'react'
import { Message } from '../typing'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import { Provider } from './providers'

async function HomePage() {
  const data=await fetch(`${process.env.VERCEL_URL||'http://localhost:3000'}/api/getMessages`)
  .then((res)=>res.json())

  const messages:Message[]=data.messages;
  //get session
   const session=await unstable_getServerSession()

  return (
    <Provider session={session}>
      <main>
        <MessageList initialMessages={messages}/>
        <ChatInput session={session}/>
      </main>
    </Provider>
  )
}

export default HomePage