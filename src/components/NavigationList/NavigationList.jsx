import clsx from "clsx";
import { NavLink } from "react-router-dom";

import css from "./NavigationList.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function NavigationList() {
  return (
    <ul className={css.navMenu}>
      <li>
        <NavLink to="/dictionary" className={getNavLinkClass}>
          Dictionary
        </NavLink>
      </li>
      <li>
        <NavLink to="/recommend" className={getNavLinkClass}>
          Recommend
        </NavLink>
      </li>
      <li>
        <NavLink to="/training" className={getNavLinkClass}>
          Training
        </NavLink>
      </li>
    </ul>
  );
}
