import { getProviders } from "next-auth/react"
import Image from 'next/image'
//import SignInComponent from './SignInComponent'

async function SignIn() {
    const providers = await getProviders()
    console.log('provid: ',providers)
  return (
    <div>
        <div>
        <Image src='https://links.papareact.com/jne' 
            alt='profile-image' 
            width={50} 
            className='rounded-full mx-2 object-contain'
            height={10}
            />
        </div>
        {/* <SignInComponent providers={providers}/> */}
    </div>
  )
}

export default SignIn