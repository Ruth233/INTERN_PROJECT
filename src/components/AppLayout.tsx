import { Outlet } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api";
import { FiLogOut } from "react-icons/fi";

const AppLayout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      alert("Failed to logout");
    }
    navigate("/", { replace: true });
  };
  return (
    <div>
      <div className="flex items-center justify-between fixed z-10 py-2 px-4 bg-white w-full top-0 left-0 border border-b-gray-300 shadow-md">
        <button
          onClick={handleLogout}
          className="py-1 px-3 bg-blue-950 rounded-md cursor-pointer text-white flex items-center gap-2"
        >
          <FiLogOut />
          Logout
        </button>

        <div className="flex gap-2 items-center">
          <NavLink
            to="/app/intern"
            className={({ isActive }) =>
              ` px-3 rounded-md cursor-pointer ${
                isActive
                  ? "bg-blue-950 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Intern
          </NavLink>
          <NavLink
            to="/app/nss"
            className={({ isActive }) =>
              `px-3 rounded-md cursor-pointer ${
                isActive
                  ? "bg-blue-950 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            NSS
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default AppLayout;
