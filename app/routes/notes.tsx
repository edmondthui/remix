import { ActionFunctionArgs, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, Note, storeNotes } from "~/data/notes";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { useLoaderData } from "@remix-run/react";

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

export function links() {
  [...newNoteLinks(), ...noteListLinks()];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  noteData.id = new Date().toISOString();
  const validatedNoteData = Note.parse(noteData);
  const exisingNotes = await getStoredNotes();
  const updatedNotes = exisingNotes.concat(validatedNoteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}
