import { ActionFunctionArgs, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import NewNote from "~/components/NewNote";
import NoteList from "~/components/NoteList";
import { getStoredNotes, Note, storeNotes } from "~/data/notes";

import "~/components/NewNote/styles.css";
import "~/components/NoteList/styles.css";

export default function NotesPage() {
  const notes = useLoaderData<Note[]>();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw Response.json(
      { message: "Could not find any notes." },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  return notes;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  noteData.id = new Date().toISOString();
  const validatedNoteData = Note.parse(noteData);

  if (validatedNoteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  const exisingNotes = await getStoredNotes();
  const updatedNotes = exisingNotes.concat(validatedNoteData);
  await storeNotes(updatedNotes);
  await new Promise((resolve, reject) =>
    setTimeout(() => resolve(undefined), 2000)
  );
  return redirect("/notes");
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error))
    return (
      <main>
        <NewNote />
        <p className="info-message">{error.data.message}</p>
      </main>
    );
  if (error instanceof Error) {
    return (
      <main className="error">
        <h1>An error related to your notes occurred!</h1>
        <p>{error.message}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
    );
  }
  return (
    <main className="error">
      <h1>An unknown error occurred!</h1>
      <p>Unknown Error</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}
