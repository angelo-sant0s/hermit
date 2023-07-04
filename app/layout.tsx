import './globals.css';
import { Roboto } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ClientCheck from './components/ClientCheck';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './components/providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getUser';

const roboto = Roboto({ 
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Hermit',
  description: 'The best solution to find a place to stay!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser =  await getCurrentUser();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClientCheck>
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            <Navbar currentUser={currentUser} />
        </ClientCheck>
        {children}
      </body>
    </html>
  )
}
