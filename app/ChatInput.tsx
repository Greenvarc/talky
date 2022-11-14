"use client"

import { unstable_getServerSession } from "next-auth"
import { FormEvent, useState } from "react"
import useSWR from "swr"
import {v4 as uuid} from 'uuid'
import { Message } from "../typing"
import fetcher from "../utils/fetchMessages"

type Props={
    session:Awaited<ReturnType<typeof unstable_getServerSession>>
}

function ChatInput({session}:Props) {
    const [input, setInput] = useState('')
    const {data:messages,error,mutate} =useSWR('/api/getMessages',fetcher)

    // console.log(messages)
    // console.log('error', error)

    const addMessage=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (!input || !session) return;
        const messageToSend=input;
        setInput('')
        const id=uuid()

        const message:Message={
            id,
            message:messageToSend,
            create_at:Date.now(),
            username:session?.user?.name!,
            profilePic:session?.user?.image!,
            email:session?.user?.email!,
        }

        //post message
        const uploadMessageToUpstash=async()=>{
            const data=await fetch('./api/addMessage',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json',
                },
                body:JSON.stringify({message})
            })
            .then(res=>res.json())
            //const data=await res.json();
            // console.log('message added ',data)
            //--------------------------------------------
            //return new messages plus oldsones 
            return [data.message,...messages!]

        }
        //update store when send messages
        await mutate(uploadMessageToUpstash,{
            optimisticData:[message,...messages!],
            rollbackOnError:true
        })
        //uploadMessageToUpstash()
    }
  return (
    <form
    onSubmit={addMessage}
     className='fixed bottom-1 w-full z-50 flex px-10 pt-5 space-x-2 border-t bg-white border-gray-100'>
        <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}

        className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-5 disabled:opacity-50 disabled:cursor-not-allowed'
         type="text" name="" id="" placeholder='enter message ...'/>
        <button
        disabled={!session||!input}
         type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
        >send</button>
    </form>
  )
}

export default ChatInput