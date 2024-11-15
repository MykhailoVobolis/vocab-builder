import { useMedia } from "react-use";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";

import css from "./AppBar.module.css";

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const isDesktop = useMedia("(min-width: 1440px)");

  return (
    <header className={isLoggedIn ? css.isLoggedInHeader : css.header}>
      <div className={css.navContainer}>
        <Navigation isLoggedIn={isLoggedIn} />
        {isDesktop && isLoggedIn && <UserMenu />}
      </div>
    </header>
  );
}
