import { Link } from "react-router";

export default function TextLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="text-sm text-secondary underline font-black hover:text-blue-700"
    >
      {children}
    </Link>
  );
}
