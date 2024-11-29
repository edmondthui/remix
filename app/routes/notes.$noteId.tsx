import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes, Note } from "~/data/notes";

import "~/styles/note-details.css";

export default function NoteDetailsPage() {
  const note = useLoaderData<typeof loader>();
  const validatedNote = Note.parse(note);
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{validatedNote.title}</h1>
      </header>
      <p id="note-details-content">{validatedNote.content}</p>
    </main>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);
  if (!selectedNote) {
    throw Response.json(
      { message: "Could not find note for id " + noteId },
      { status: 404 }
    );
  }
  return selectedNote;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const validatedNote = Note.parse(data);
  return [
    { title: validatedNote.title },
    { name: "description", content: "Manage your notes with ease." },
  ];
};
