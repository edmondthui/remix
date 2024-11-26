import { ActionFunctionArgs, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, Note, storeNotes } from "~/data/notes";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export function links() {
  [...newNoteLinks()];
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
