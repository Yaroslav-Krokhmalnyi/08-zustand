"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient() {
  const router = useRouter();
    const handleClose = () => router.push('/notes/filter/all');

const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  const formattedDate = note.updatedAt
    ? `Updated at: ${new Date(note.updatedAt).toLocaleDateString('uk-UA')}`
    : `Created at: ${new Date(note.createdAt).toLocaleDateString('uk-UA')}}`;

  return (
    <main className={css.main}>
      <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
            <h2>{note.title}</h2>
            <p className={css.tag}>{note.tag}</p>
        </div>
        <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {formattedDate}
          </p>
      </div>
      <button type="button" className={css.backBtn} onClick={handleClose}>Back</button>
    </div>
    </main>
    
  );
}
