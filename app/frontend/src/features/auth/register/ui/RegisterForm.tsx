import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useRegister } from "@/features/auth";
import { Input, Button } from "@/shared";

export function RegisterForm() {
  const { submit, error } = useRegister();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();
    submit(normalizedEmail, normalizedUsername, password, confirmPassword);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 w-full max-w-[450px]"
    >
      <Input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        classNameParent="w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        classNameParent="w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        spellCheck={false}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Mot de passe"
        classNameParent="w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        required
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        classNameParent="w-full"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
        required
      />
      <div className="text-xs xl:block hidden">
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          value={password}
          valueAgain={confirmPassword}
          messages={{
            minLength: "Le mot de passe doit avoir au moins 8 caractères.",
            specialChar:
              "Le mot de passe doit contenir au moins un caractère spécial.",
            number: "Le mot de passe doit contenir au moins un chiffre.",
            capital: "Le mot de passe doit contenir au moins une majuscule.",
            match: "Les mots de passe ne sont pas identiques.",
          }}
        />
      </div>
      <Button
        type="submit"
        variant="blue-gradient"
        className="w-[300px] max-w-full mt-3"
      >
        S&rsquo;inscrire
      </Button>
      {error && <p className="text-red-700 text-center">{error}</p>}
    </form>
  );
}
