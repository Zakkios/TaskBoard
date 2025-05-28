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
    <div>
      <NavLink to="/">
        <img
          src={Logo}
          alt="logo"
          className="fixed top-4 left-24 w-[80px] z-50"
        />
      </NavLink>
      <div className="fixed left-72 top-0 border-r border-tertiary h-full"></div>
      <div className="fixed flex h-full justify-between flex-col">
        <div className="mt-24 w-[18rem] px-4 ">
          <NavLink to="/">
            {" "}
            <Button
              variant={
                location.pathname === "/" ? "nav-item-active" : "nav-item"
              }
              className="flex items-center gap-2 mt-8 mb-3 w-full"
            >
              <GoHomeFill size="22" /> Tableau des tâches
            </Button>
          </NavLink>
          <NavLink to="/statistics">
            {" "}
            <Button
              variant={
                location.pathname === "/statistics"
                  ? "nav-item-active"
                  : "nav-item"
              }
              className="flex items-center gap-2 mb-3 w-full"
            >
              <BiSolidBarChartSquare size="22" /> Statistiques
            </Button>
          </NavLink>
        </div>
        <div className="w-[18rem] px-4 ">
          <Button
            variant="nav-item"
            className="flex items-center gap-2 mb-3 w-full"
            onClick={handleLogout}
          >
            <IoLogOut size="22" /> Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
}
