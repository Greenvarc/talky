import { getProviders } from "next-auth/react"
import Image from 'next/image'
import SignInComponent from './SignInComponent'

async function SignIn() {
    const providers = await getProviders()
    
  return (
    <div className="grid justify-center">
        <div>
        <Image src='https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-bird-business-company-logo-png-image_704186.jpg' 
            alt='profile-image' 
            width={400} 
            className='relative rounded-full mx-2 object-contain'
            height={400}
            />
        </div>
        <SignInComponent providers={providers}/>
    </div>
  )
}

export default SignIn