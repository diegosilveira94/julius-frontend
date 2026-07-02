import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo-julius.png";
import dashboardIcon from "/dashboard.svg";
import expenseIcon from "/expense.svg";
import categoryIcon from "/category.svg";
import { useAuth } from "../../hooks/useAuth";

const menu = [
  { label: "Dashboard", icon: dashboardIcon, to: "/" },
  { label: "Despesas", icon: expenseIcon, to: "/expenses" },
  { label: "Categorias", icon: categoryIcon, to: "/categories" },
];

function Aside({ mobileOpen = false, onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <aside
      className={`${
        mobileOpen ? "flex" : "hidden"
      } w-full flex-col border-r border-border bg-background px-8 py-5 md:flex md:min-h-screen md:w-72`}
    >
      <img src={logo} alt="Julius" className="mx-auto max-h-32" />
      <p className="mt-2 text-center text-[13px] text-gray-400">
        "Se eu não comprar nada, o desconto é maior".
      </p>

      <nav className="mt-9 flex flex-1 flex-col gap-2">
        {menu.map((op) => (
          <NavLink
            key={op.to}
            to={op.to}
            end={op.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-colors ${
                isActive
                  ? "bg-surface-2 text-primary"
                  : "text-gray-300 hover:bg-surface hover:text-primary"
              }`
            }
          >
            <img src={op.icon} className="w-5" alt="" />
            {op.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 border-t border-border pt-4">
        {user && (
          <p className="mb-3 truncate text-sm text-gray-300">
            Olá, <span className="font-medium text-gray-100">{user.name}</span>
          </p>
        )}
        <button
          onClick={logout}
          className="w-full rounded-md border border-border px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-surface hover:text-danger"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}

export default Aside;
