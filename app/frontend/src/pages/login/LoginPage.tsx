import Logo from "@/shared/assets/logo.png";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col-reverse items-center justify-center p-4">
      <img
        src={Logo}
        alt="logo"
        className="absolute top-10 w-[200px] max-w-[40%]"
      />
      <div className="w-full max-w-[90%] md:max-w-[500px] bg-[#E2DEFF] p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Login Page</h1>
        <p className="text-center mb-6">
          Please enter your credentials to log in.
        </p>
      </div>
    </div>
  );
}
