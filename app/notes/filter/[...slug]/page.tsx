// Meta
import { Metadata } from 'next';

// Constants
import TAGS from "@/constants/noteTags";

// Next.js
import { notFound } from "next/navigation";

// Components
import NotesPageClient from "./Notes.client";

// Types
import type { NoteTag } from "@/types/note";

interface NotesByCategoryProps {
  slug: string[];
}

export async function generateMetadata(
  { params }: { params: Promise<NotesByCategoryProps> }
): Promise<Metadata> {
  const { slug } = await params;
  const [filter] = slug;

  if (filter === "all") {
    return {
      title: "All notes",
      description: "All notes in NoteHub",
      openGraph: {
        title: "All notes",
        description: "All notes in NoteHub",
        url: "https://08-zustand-drab-kappa.vercel.app/notes/filter/all",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub — a simple web-based note-taking application built with Next.js",
          },
        ],
        type: "website",
      },
    };
  }

  if (TAGS.includes(filter as NoteTag)) {
    return {
      title: `Notes: ${filter}`,
      description: `Notes filtered by ${filter}`,
      openGraph: {
        title: `Notes: ${filter}`,
        description: `Notes filtered by ${filter}`,
        url: `https://08-zustand-drab-kappa.vercel.app/notes/filter/${filter}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub — a simple web-based note-taking application built with Next.js",
          },
        ],
        type: "website",
      },
    };
  }

  return {
    title: "Notes",
  };
}

const NotesByCategory = async ({
  params,
}: {
  params: Promise<NotesByCategoryProps>;
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