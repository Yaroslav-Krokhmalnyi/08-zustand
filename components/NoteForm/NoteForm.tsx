"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";

// API
import { addNote } from "@/lib/api";

// Styles
import css from "./NoteForm.module.css";

// Types
import type { CreateNoteParams, NoteTag } from "@/types/note";

interface NoteFormProps {
  categories: NoteTag[];
}

export default function NoteForm({ categories }: NoteFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      router.push("/notes/filter/all");
    },
  });

  // Yup schema
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be at most 50 characters")
      .required("Title is required"),

    content: Yup.string()
      .trim()
      .max(500, "Content must be at most 500 characters")
      .required("Content is required"),

    tag: Yup.mixed<NoteTag>()
      .oneOf(categories, "Invalid category")
      .required("Category is required"),
  });

  const handleSubmit = async (formData: FormData) => {
    const payload: CreateNoteParams = {
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      tag: formData.get("tag") as NoteTag,
    };

    try {
      await NoteFormSchema.validate(payload, {
        abortEarly: false,
      });

      setErrors({});
      mutate(payload);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};

        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });

        setErrors(validationErrors);
      }
    }
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
        />
        <span className={css.error}>{errors.title}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        <span className={css.error}>{errors.content}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <span className={css.error}>{errors.tag}</span>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push("/notes/filter/all")}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}