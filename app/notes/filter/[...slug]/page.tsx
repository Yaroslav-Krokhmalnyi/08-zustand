// app/notes/filter/[...slug]/page.tsx

// Constants
import TAGS from "@/constants/noteTags";

// Next.js
import { notFound } from "next/navigation";

// Components
import NotesPageClient from "./NotesPageClient";

// Types
import type { NoteTag } from "@/types/note";

interface NotesByCategoryParams {
  slug: string[];
}

const NotesByCategory = async ({
  params,
}: {
  params: Promise<NotesByCategoryParams>;
}) => {
  const { slug } = await params;
  const filter = slug[0];

  function isNoteTag(value: string): value is NoteTag {
    return TAGS.includes(value as NoteTag);
  }

  if (filter === "all") {
    return <NotesPageClient />;
  }

  if (isNoteTag(filter)) {
    return <NotesPageClient tag={filter} />;
  }

  notFound();
};

export default NotesByCategory;