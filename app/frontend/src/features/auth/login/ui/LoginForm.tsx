import useLogin from "@/features/auth/login/model/useLogin";
import { useState } from "react";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import Loader from "@/shared/ui/Loader/Loader";

export default function LoginPage() {
  const { submit, error, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 w-full max-w-[450px]"
    >
      {loading && <Loader />}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        classNameParent="w-full"
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Mot de passe"
        classNameParent="w-full"
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        required
      />
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
      <Button
        type="submit"
        variant={loading ? "disabled" : "secondary"}
        className="w-[300px] max-w-full mt-2"
        disabled={loading}
      >
        {loading ? "Connexion en cours..." : "Connexion"}
      </Button>
    </form>
  );
}
