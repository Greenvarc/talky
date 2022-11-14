import Pusher from "pusher";
import ClientPusher from 'pusher-js'

type Pushery={
    appId: string
    key: string,
    secret: string,
    cluster:string,
    useTLS: boolean
}

export const serverPusher =  new Pusher({
    appId:process.env.PUSHER_APP_ID!,
    key:process.env.PUSHER_KEY!,
    secret:process.env.PUSHER_SECRET!,
    cluster:process.env.PUSHER_CLUSTER!,
    useTLS:true
})


export const clientPusher=new ClientPusher('4b13c8f09e98134c0960', {
    cluster: 'mt1',
    forceTLS:true
  })

