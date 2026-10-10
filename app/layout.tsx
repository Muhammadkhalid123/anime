import type { Metadata } from 'next';
import { Newsreader, Schibsted_Grotesk, DM_Mono } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-schibsted',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
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
      className={`${newsreader.variable} ${schibstedGrotesk.variable} ${dmMono.variable}`}
    >
      <body className="bg-[#0C1D19] text-[#E3E6E1] min-h-screen font-sans antialiased overflow-x-hidden selection:bg-[#F0B43A] selection:text-[#0A1411]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
