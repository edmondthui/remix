import fs from "fs/promises";
import { z } from "zod";

export const Note = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});
export type Note = z.infer<typeof Note>;

const Notes = z.array(Note);

export async function getStoredNotes(): Promise<Note[]> {
  const rawFileContent = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedNotes = Notes.parse(data.notes);
  return storedNotes;
}

export function storeNotes(notes: Note[]) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}
