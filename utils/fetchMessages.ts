import { Message } from "../typing";

//make request from api
const fetcher=async()=>{
    const res=await fetch('/api/getMessages');
    const data=await res.json();
    const messages:Message[]=data.messages;

    return messages
}

export default fetcher;