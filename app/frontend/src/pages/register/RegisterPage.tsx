import Logo from "@/shared/assets/logo.png";
import RegisterForm from "@/features/auth/register/ui/RegisterForm";
import TextLink from "@/shared/ui/TextLink/TextLink";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex flex-col-reverse items-center justify-center p-4">
      <img
        src={Logo}
        alt="logo"
        className="absolute top-10 w-[100px] max-w-[40%]"
      />
      <div className="flex items-center justify-center w-[800px] max-w-[90%] h-[550px] bg-primary p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <RegisterForm />
          <div className="text-center">
            <p className="leading-none">Tu as déjà un compte ?</p>
            <TextLink to="/login">Clique ici pour te connecter.</TextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
