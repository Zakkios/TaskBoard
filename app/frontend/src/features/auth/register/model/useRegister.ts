import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "@/features/auth/register/api/register.api";
import { registerSchema } from "@/features/auth/register/model/registerSchema";
import { useLoader } from "@/shared/ui/Loader/useLoader";

export default function useRegister() {
  const { show, hide } = useLoader();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    show();
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
      hide();
      return;
    }

    try {
      await register(email, username, password);
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
