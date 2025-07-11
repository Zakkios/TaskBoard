import { z } from "zod";

export const tagSchema = z.object({
  name: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères.")
    .max(15, "Le titre ne doit pas dépasser 15 caractères."),
  color: z
    .string()
    .min(6, "Le titre doit contenir au moins 6 caractères.")
    .max(6, "Le titre ne doit pas dépasser 6 caractères."),
});
