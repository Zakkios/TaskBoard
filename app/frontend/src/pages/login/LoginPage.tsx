import Logo from "@/shared/assets/logo.png";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col-reverse items-center justify-center p-4">
      <img
        src={Logo}
        alt="logo"
        className="absolute top-10 w-[200px] max-w-[40%]"
      />
      <div className="flex items-center justify-center w-[800px] max-w-[90%] h-[400px] bg-primary p-8 rounded-2xl shadow-lg">
        <form className="flex flex-col items-center gap-4 w-full max-w-[450px]">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            classNameParent="w-full"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            classNameParent="w-full"
            required
          />
          <Button
            type="submit"
            variant="secondary"
            className="w-[300px] max-w-full"
          >
            Connexion
          </Button>
        </form>
      </div>
    </div>
  );
}
