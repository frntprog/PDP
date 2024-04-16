import { z } from "zod";

export const RequestValidator = z.object({
  request: z.string().min(3).max(100),
});
