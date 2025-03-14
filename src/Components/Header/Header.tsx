import { NavLink } from "react-router-dom";
import SelectMonth from "./SelectMonth";
import "./styles.css";

function Header() {
  return (
    <header>
      <h1>Finanzas Personales</h1>
      <SelectMonth />
      <div className="links">
        <NavLink
          to={"/table-transactions"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <button>PRINCIPAL</button>
        </NavLink>
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <button>DASHBOARD</button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
