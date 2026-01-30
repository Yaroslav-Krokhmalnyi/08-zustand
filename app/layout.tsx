// Meta
import { Metadata } from 'next';

// Liberis
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

// Components
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

//Styles
import "./globals.css";

// Fonts
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple notes application built with Next.js",
  openGraph: {
      title: "NoteHub",
      description: "A simple notes application built with Next.js",
      url: 'https://08-zustand-drab-kappa.vercel.app',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub — a simple web-based note-taking application built with Next.js',
        },
      ],
      type: 'website',
    },
  };

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}