import type { Metadata } from 'next';
import { Monomaniac_One } from 'next/font/google';
import './globals.css';

const monomaniac = Monomaniac_One({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Spirited Pass',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={monomaniac.className}>
        <main className="relative flex min-h-screen flex-col items-center gap-4 p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
