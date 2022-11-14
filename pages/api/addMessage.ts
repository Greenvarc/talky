// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverPusher } from '../../pusher'
import redis from '../../redis'
import { Message } from '../../typing'

type Data = {
  message:Message
}
type ErrorData={
    body:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|ErrorData>
) {
    if (req.method!=='POST'){
        res.status(405).json({body:"Method Not Allowed"})
        return
    }
    const {message}=req.body;
    const newMessage={...message,
        // replace time to server time (db time)
    create_at:Date.now()}
    //push message to upstash db ..
    await redis.hset('messages',message.id,JSON.stringify(newMessage))
    //add pusher to auto update and refresh on all users without focus on screen (like push notifs)
    
    serverPusher.trigger('messages','new-message',newMessage);
  res.status(200).json({ message:newMessage })
}
