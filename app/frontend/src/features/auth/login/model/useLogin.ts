import { useState } from "react";
import { login } from "@/features/auth/login/api/login.api";
import { useNavigate } from "react-router";
import { loginSchema } from "@/features/auth/login/model/loginSchema";
import { useLoader } from "@/shared/ui/Loader/useLoader";

export default function useLogin() {
  const { show, hide } = useLoader();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (email: string, password: string) => {
    show();
    setError(null);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const message = result.error.errors[0]?.message || "Données invalides.";
      setError(message);
      hide();
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Email ou mot de passe invalide");
    } finally {
      hide();
    }
  };

  return { submit, error };
}
