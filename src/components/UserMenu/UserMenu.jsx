import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";

import css from "./UserMenu.module.css";

export default function UserMenu() {
  return (
    <div className={css.userMenuContainer}>
      <UserAvatar />
      <LogoutButton />
    </div>
  );
}
