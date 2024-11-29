import { ActionFunctionArgs, redirect } from "@remix-run/node";
import NewNote from "~/components/NewNote";
import { getStoredNotes, Note, storeNotes } from "~/data/notes";
import NoteList from "~/components/NoteList";
import { useLoaderData } from "@remix-run/react";

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
