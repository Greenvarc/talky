
import { unstable_getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton'

type Props={
    session:Awaited<ReturnType<typeof unstable_getServerSession>>
}

const Header = ({session}:Props) => {
    //const session =await unstable_getServerSession()
    if (session) return(
    <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
        <div className='flex space-x-2'>
            <Image src={session?.user?.image!}
            alt='profile-image' 
            width={50} 
            className='rounded-full mx-2 object-contain'
            height={10}
            />
            <div>
                <p>Logged in as :</p>
                <p>{session.user?.name}</p>
            </div>
        </div>
        <LogoutButton/>
    </header>
    )
  return (
    <header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
        <div className='flex flex-col items-center space-y-5'>
            <div className='flex space-x-2 items-center'>
                <Image src='https://links.papareact.com/jne' height={10} width={50}  alt='Logo'/>

                <p className='text-blue-400'>Welcome to Talky🦜</p>
            </div>

            <Link href='/auth/signin' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >Singn In</Link>
        </div>
    </header>
  )
}

export default Header