// Liberis
import { QueryClient, HydrationBoundary,
  dehydrate, } from "@tanstack/react-query";

// Styles
import css from './NotePreview.module.css';

// API
import { fetchNoteById } from "@/lib/api";

//Components
import NotePreviewClient from "./NotePreview.client";

// Types
type NotePreviewProps = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: NotePreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (<HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>);
};

export default NotePreview;

