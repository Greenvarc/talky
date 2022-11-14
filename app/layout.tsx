import { unstable_getServerSession } from 'next-auth'
import '../styles/globals.css'
import Header from './Header'
import { Provider } from './providers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session =await unstable_getServerSession();
  return (
    <html>
      <head />
      <body>
        <Header session={session}/>
        {children}
        {/* <Provider session={session}>
          {children}
          // put it in page level
        </Provider> */}
        </body>
    </html>
  )
}
