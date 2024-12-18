import { useMedia } from "react-use";
import { Link } from "react-router-dom";

import NavigationList from "../NavigationList/NavigationList.jsx";
import BurgerButton from "../BurgerButton/BurgerButton.jsx";
import UserAvatar from "../UserAvatar/UserAvatar.jsx";

import css from "./Navigation.module.css";

export default function Navigation({ isLoggedIn }) {
  const isDesktop = useMedia("(min-width: 1440px)");

  return (
    <div className={css.barContainer}>
      <nav className={css.navigation}>
        <Link className={css.mainLogo} to="/">
          <img className={css.logo} width={36} height={36} src="/logo.svg" alt="logo" />
          VocabBuilder
        </Link>
        {isDesktop && isLoggedIn && <NavigationList />}
      </nav>
      {!isDesktop && isLoggedIn && <UserAvatar />}
      {!isDesktop && isLoggedIn && <BurgerButton />}
    </div>
  );
}
