import clsx from "clsx";
import { NavLink } from "react-router-dom";

import css from "./NavigationList.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function NavigationList({ onClose }) {
  return (
    <ul className={css.navMenu}>
      <li>
        <NavLink to="/dictionary" className={getNavLinkClass} onClick={onClose}>
          Dictionary
        </NavLink>
      </li>
      <li>
        <NavLink to="/recommend" className={getNavLinkClass} onClick={onClose}>
          Recommend
        </NavLink>
      </li>
      <li>
        <NavLink to="/training" className={getNavLinkClass} onClick={onClose}>
          Training
        </NavLink>
      </li>
    </ul>
  );
}
