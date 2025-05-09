import { useState } from "react";
import { login } from "@/features/auth/login/api/login";
import { useNavigate } from "react-router";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Email ou mot de passe invalide");
    } finally {
      setLoading(false);
    }
  };

  return { submit, error, loading };
}
