import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(5, "L'email doit contenir au moins 5 caractères.")
      .max(100, "L'email ne doit pas dépasser 100 caractères.")
      .email("Format d'email invalide."),
    username: z
      .string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères.")
      .max(30, "Le nom d'utilisateur ne doit pas dépasser 30 caractères.")
      .regex(/^[a-zA-Z0-9._-]+$/, {
        message: "Caractères autorisés : lettres, chiffres, ., -, _",
      }),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
      .max(72, "Le mot de passe ne doit pas dépasser 72 caractères.")
      .regex(/[A-Z]/, "Une majuscule est requise.")
      .regex(/[0-9]/, "Un chiffre est requis.")
      .regex(/[^A-Za-z0-9]/, "Un caractère spécial est requis."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export type RegisterDto = z.infer<typeof registerSchema>;
