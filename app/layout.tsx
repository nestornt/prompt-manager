import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import { ReactNode } from 'react'; // This will ensure that the children prop can be any valid JSX content, such as a single React element or an array of React elements.

export const metadata = {
  title: "Prompt Manager",
  description: "Discover & share AI prompts"
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout