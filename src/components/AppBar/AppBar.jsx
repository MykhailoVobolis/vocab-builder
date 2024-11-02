import { useMedia } from "react-use";
import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu /UserMenu .jsx";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

import css from "./AppBar.module.css";

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const isTablet = useMedia("(min-width: 768px)");

  return (
    <header className={css.header}>
      <div className={css.navContainer}>
        <Navigation isLoggedIn={isLoggedIn} />
        {isLoggedIn && <UserMenu />}
      </div>
    </header>
  );
}
