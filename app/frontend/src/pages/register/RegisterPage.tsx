import { useState } from "react";
import Logo from "@/shared/assets/logo.png";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import TextLink from "@/shared/ui/TextLink/TextLink";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="relative min-h-screen flex flex-col-reverse items-center justify-center p-4">
      <img
        src={Logo}
        alt="logo"
        className="absolute top-10 w-[100px] max-w-[40%]"
      />
      <div className="flex items-center justify-center w-[800px] max-w-[90%] h-[500px] bg-primary p-8 rounded-2xl shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full max-w-[450px]"
        >
          <Input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            classNameParent="w-full"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            classNameParent="w-full"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            classNameParent="w-full"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            classNameParent="w-full"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="secondary"
            className="w-[300px] max-w-full mt-8"
          >
            Inscription
          </Button>
          <div className="text-center">
            <p className="leading-none">Tu as déjà un compte ?</p>
            <TextLink to="/login">Clique ici pour te connecter.</TextLink>
          </div>
        </form>
      </div>
    </div>
  );
}
