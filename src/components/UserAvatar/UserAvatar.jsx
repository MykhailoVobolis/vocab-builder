import clsx from "clsx";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

import css from "./UserAvatar.module.css";

export default function UserAvatar({ variant }) {
  const user = useSelector(selectUser);
  const avatarLetter = user?.name ? user.name[0] : null;

  return (
    <div className={css.userAvatarContainer}>
      <p className={clsx(css.userName, variant === "mobileMenu" && css.userNameMobile)}>{user.name}</p>
      {avatarLetter && (
        <p className={clsx(css.userAvatar, variant === "mobileMenu" && css.userAvatarMobile)}>{avatarLetter}</p>
      )}
    </div>
  );
}
