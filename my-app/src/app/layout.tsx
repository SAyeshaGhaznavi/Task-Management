import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../../context/authContext';
import { WebSocketProvider } from '../context/websocketContext';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
