import { useState } from "react";
import { register } from "@/features/auth/register/api/register";
import { useNavigate } from "react-router";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (email: string, username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await register(email, username, password);
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
