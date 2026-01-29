// Meta
import { Metadata } from 'next';

//Styles
import "./globals.css";

// Components
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple notes application built with Next.js",
  openGraph: {
      title: "NoteHub",
      description: "A simple notes application built with Next.js",
      url: 'https://yaroslav-krokhmalnyi.github.io/08-zustand/',
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
      <body>
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