import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snow Operations Dashboard',
  description: 'Real-time monitoring and resource management'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {children}
      </body>
    </html>
  );
}
