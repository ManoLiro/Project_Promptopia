import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Children } from 'react';

export const metada = {
    title: 'Promptopia',
    description: 'Discovery Promptopia and Share Prompts',
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient'></div>
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