import { useState } from "react";
import { login } from "@/features/auth/login/api/login";
import { useNavigate } from "react-router";
import { loginSchema } from "./loginSchema";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const message = result.error.errors[0]?.message || "Données invalides.";
      setError(message);
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Email ou mot de passe invalide");
    } finally {
      setLoading(false);
    }
  };

  return { submit, error, loading };
}
