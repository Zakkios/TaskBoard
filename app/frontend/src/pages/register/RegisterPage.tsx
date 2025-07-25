import { RegisterForm } from "@/features/auth";
import { Logo, TextLink } from "@/shared";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex flex-col-reverse items-center justify-center p-4 bg-gradient-to-br from-gradient-blue to-gradient-purple">
      <div className="absolute top-10 flex flex-col items-center justify-center gap-4 text-center pb-3">
        <div>
          <Logo size={46} />
        </div>
        <h1 className="text-3xl font-bold text-white">TaskBoard</h1>
      </div>
      <div className="flex items-center justify-center w-[800px] max-w-[90%] max-h-[550px] bg-white/30 border-solid border-1 border-white p-8 rounded-2xl shadow-lg">
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
