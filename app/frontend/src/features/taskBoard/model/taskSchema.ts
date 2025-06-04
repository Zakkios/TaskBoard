import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères.")
    .max(50, "Le titre ne doit pas dépasser 50 caractères."),
  description: z
    .string()
    .max(500, "La description ne doit pas dépasser 500 caractères.")
    .optional(),
  status: z.enum(["todo", "doing", "done"], {
    errorMap: () => ({ message: "Statut invalide." }),
  }),
  tagsIds: z
    .array(z.string())
    .max(5, "Un maximum de 5 étiquettes est autorisé."),
});
