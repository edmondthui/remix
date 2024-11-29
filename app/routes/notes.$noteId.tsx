import { LoaderFunctionArgs } from "@remix-run/node";
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

export async function loader({ params }: LoaderFunctionArgs) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);
  return selectedNote;
}
