import type { Metadata } from 'next';
import { Monomaniac_One } from 'next/font/google';
import './globals.css';
import { ToastProvider } from './providers/ToastProvider';
import { TrainProvider } from './providers/TrainProvider';
import ErrorBoundary from '@/components/ErrorBoundary';

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
        <main className="relative flex min-h-screen flex-col items-center gap-4 p-4 md:p-16">
          <ToastProvider>
            <ErrorBoundary>
              <TrainProvider>{children}</TrainProvider>
            </ErrorBoundary>
          </ToastProvider>
        </main>
      </body>
    </html>
  );
}
