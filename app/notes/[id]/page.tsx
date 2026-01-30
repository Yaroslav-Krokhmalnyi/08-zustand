// Meta
import { Metadata } from "next"

// Liberis
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// API
import { fetchNoteById } from "@/lib/api";

// Components
import NoteDetailsClient from "./NoteDetails.client";

// Types
type NoteDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params
  const note = await fetchNoteById(id)
  
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 30),
      url: `https://08-zustand-drab-kappa.vercel.app/notes/${id}`,
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
  }
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

