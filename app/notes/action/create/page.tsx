// Meta
import { Metadata } from "next"

// Components
import NoteForm from '@/components/NoteForm/NoteForm'

// Constants
import TAGS from "@/constants/noteTags";

// Styles
import css from './CreateNote.module.css'

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note in NoteHub.",
  openGraph: {
      title: "Create note",
      description: "Create a new note in NoteHub.",
       url: 'https://08-zustand-drab-kappa.vercel.app/notes/action/create',
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

const CreateNote = () => {
  return (
<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm categories={TAGS} />
  </div>
</main>
  )
};

export default CreateNote;