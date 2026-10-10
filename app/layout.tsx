import type { Metadata } from 'next';
import { Playfair_Display, Geist, DM_Mono } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DREAMFRAME — Digital Studio, Web, AI & Search',
  description:
    'We design and build websites, AI tools and search visibility for brands that want to be found and remembered.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${geist.variable} ${dmMono.variable}`}
    >
      <body className="bg-[#0C1D19] text-[#E3E6E1] min-h-screen font-sans antialiased overflow-x-hidden selection:bg-[#F0B43A] selection:text-[#0A1411]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
