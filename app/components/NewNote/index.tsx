import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Message } from "~/data/message";
import { action } from "~/routes/notes";

export default function NewNote() {
  const navigation = useNavigation();
  const data = useActionData<typeof action>();
  const validatedData = Message.parse(data);
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" action="/notes" id="note-form">
      {validatedData?.message && <p>{validatedData.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}
