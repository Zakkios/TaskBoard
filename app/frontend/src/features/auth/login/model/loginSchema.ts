import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(5, "L'email doit contenir au moins 5 caractères.")
    .max(100, "L'email ne doit pas dépasser 100 caractères.")
    .email("Format d'email invalide."),
  password: z
    .string()
    .max(72, "Le mot de passe est trop long."),
});

export type LoginDto = z.infer<typeof loginSchema>;
