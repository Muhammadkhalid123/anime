import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif-editorial",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DREAMFRAME — Creative Agency, Web Apps, AI Solutions & Growth",
  description: "Next-generation full-stack digital agency delivering design systems, dynamic web apps, autonomous AI solutions, brand graphics, and advanced SEO/GEO/AEO growth engines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} dark`}
    >
      <body className="bg-black text-[#ededed] min-h-screen font-sans selection:bg-[#ff5500]/30 selection:text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
