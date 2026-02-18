import type { Metadata } from 'next';
import { Outfit, Cinzel } from 'next/font/google';
import './globals.css';
import Loader from './components/Loader';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export const metadata: Metadata = {
  title: 'Jujutsu Kaisen | Immersive Experience',
  description: 'An immersive web platform exploring the world of Jujutsu Kaisen.',
};

import Navbar from './components/Navbar';

// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${cinzel.variable} antialiased bg-black text-white overflow-x-hidden`}>
        <Navbar />
        <Loader />
        {children}
      </body>
    </html>
  );
}
