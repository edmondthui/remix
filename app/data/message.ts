import { z } from "zod";

export const Message = z
  .object({
    message: z.string(),
  })
  .optional();
export type Message = z.infer<typeof Message>;
