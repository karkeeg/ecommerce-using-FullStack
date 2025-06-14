import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiTag,
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiLogOut,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
} from "react-icons/fi";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    navigate("/");
  };

  const isActiveLink = (path) => location.pathname === path;

  const navItems = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/admin/dashboard" },
    { name: "Categories", icon: <FiTag size={20} />, path: "/admin/category" },
    { name: "Products", icon: <FiBox size={20} />, path: "/admin/product" },
    { name: "Users", icon: <FiUsers size={20} />, path: "/admin/users" },
    {
      name: "Orders",
      icon: <FiShoppingBag size={20} />,
      path: "/admin/orders",
    },
  ];

  return (
    <aside className="flex flex-col justify-between w-64 bg-slate-800 text-white shadow-2xl min-h-screen relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative z-8 px-6 py-6">
        {/* Header with enhanced styling */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10  from-indigo-400  rounded-lg flex items-center justify-center shadow-lg">
              <FiSettings size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </div>
        </div>

        {/* Navigation with enhanced styling */}
        <nav
          className="flex flex-col space-y-1"
          role="navigation"
          aria-label="Admin navigation"
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`group flex items-center justify-between px-4 py-3.5 rounded-xl  ${
                isActiveLink(item.path)
                  ? "bg-indigo-600 text-white transform scale-[1.05]"
                  : "hover:bg-slate-700/70 hover:transform hover:scale-[1.01] hover:shadow-md"
              }`}
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`transition-colors duration-200 ${
                    isActiveLink(item.path)
                      ? "text-indigo-200"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium tracking-wide">
                  {item.name}
                </span>
              </div>
              <FiChevronRight
                size={16}
                className={`transition-all duration-200 ${
                  isActiveLink(item.path)
                    ? "text-indigo-200 transform translate-x-1"
                    : "text-slate-500 group-hover:text-slate-300 group-hover:transform group-hover:translate-x-1"
                }`}
              />
            </Link>
          ))}

          {/* Logout button with enhanced styling */}
          <button
            onClick={handleLogout}
            className="group flex items-center justify-between px-4 py-3.5 text-left text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all duration-300 ease-out mt-6 border border-red-500/20 hover:border-red-400/40 hover:shadow-md hover:shadow-red-500/10"
          >
            <div className="flex items-center space-x-4">
              <FiLogOut size={20} className="group-hover:animate-pulse" />
              <span className="text-sm font-medium tracking-wide">Logout</span>
            </div>
            <FiChevronRight
              size={16}
              className="text-red-500 group-hover:text-red-300 group-hover:transform group-hover:translate-x-1 transition-all duration-200"
            />
          </button>
        </nav>
      </div>

      {/* Bottom section with enhanced styling */}
      <div className="relative z-10 px-6 pb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6"></div>
        <div className="flex flex-col space-y-1">
          <Link
            to="/admin/settings"
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ease-out ${
              isActiveLink("/admin/settings")
                ? "bg-gradient-to-r from-slate-700 to-slate-600 text-white"
                : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              <FiSettings size={18} />
              <span className="text-sm font-medium">Settings</span>
            </div>
            <FiChevronRight
              size={14}
              className="group-hover:transform group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>

          <Link
            to="/admin/help"
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ease-out ${
              isActiveLink("/admin/help")
                ? "bg-gradient-to-r from-slate-700 to-slate-600 text-white"
                : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              <FiHelpCircle size={18} />
              <span className="text-sm font-medium">Help & Support</span>
            </div>
            <FiChevronRight
              size={14}
              className="group-hover:transform group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>
        </div>

        {/* Footer accent */}
        <div className="mt-6 text-center">
          <div className="inline-block px-5 py-2 bg-slate-900/50 rounded-full">
            <span className="text-xs text-slate-300 font-medium">
              BIBEK KARKI
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
