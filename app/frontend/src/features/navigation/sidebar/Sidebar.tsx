import Logo from "@/shared/assets/logoBlanc.png";
import Button from "@/shared/ui/Button/Button";
import { GoHomeFill } from "react-icons/go";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router";
import { IoLogOut } from "react-icons/io5";
import logout from "@/features/auth/logout/logout";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    // Wrapper responsive
    <div>
      {/* Logo */}
      <NavLink to="/">
        <img
          src={Logo}
          alt="logo"
          className="fixed top-5 left-3 w-14 z-50 md:left-24 md:top-4 md:w-[80px]"
        />
      </NavLink>
      <div className="fixed left-20 md:left-72 top-0 border-r border-tertiary h-full transition-all z-50"></div>

      {/* Sidebar container */}
      <div
        className="
        fixed flex flex-col justify-between h-full
        bg-white
        w-20 px-4
        md:w-[18rem]
        transition-all
      "
      >
        {/* Navigation items */}
        <div className="mt-24 flex flex-col gap-3 items-center md:items-stretch">
          <NavLink to="/" className="w-full">
            <Button
              variant={
                location.pathname === "/" ? "nav-item-active" : "nav-item"
              }
              className="flex flex-col items-center gap-1 w-full md:flex-row md:gap-2 mt-8"
            >
              <GoHomeFill size="22" />
              <span className="text-xs md:text-base md:inline hidden">
                Tableau des tâches
              </span>
            </Button>
          </NavLink>
          <NavLink to="/statistics" className="w-full">
            <Button
              variant={
                location.pathname === "/statistics"
                  ? "nav-item-active"
                  : "nav-item"
              }
              className="flex flex-col items-center gap-1 w-full md:flex-row md:gap-2"
            >
              <BiSolidBarChartSquare size="22" />
              <span className="text-xs md:text-base md:inline hidden">
                Statistiques
              </span>
            </Button>
          </NavLink>
        </div>

        {/* Logout */}
        <div className="mb-4 flex flex-col items-center md:items-stretch">
          <Button
            variant="nav-item"
            className="flex flex-col items-center gap-1 w-full md:flex-row md:gap-2"
            onClick={handleLogout}
          >
            <IoLogOut size="22" />
            <span className="text-xs md:text-base md:inline hidden">
              Déconnexion
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
