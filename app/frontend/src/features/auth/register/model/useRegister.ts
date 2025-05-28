import { useState } from "react";
import { register } from "@/features/auth/register/api/register.api";
import { useNavigate } from "react-router";
import { registerSchema } from "./registerSchema";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    setLoading(true);
    setError(null);

    const result = registerSchema.safeParse({
      email,
      username,
      password,
      confirmPassword,
    });
    if (!result.success) {
      const message = result.error.errors[0]?.message || "Données invalides.";
      console.log(result.error);
      setError(message);
      setLoading(false);
      return;
    }

    try {
      await register(email, username, password);
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
