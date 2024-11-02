import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

import css from "./UserAvatar.module.css";

export default function UserAvatar() {
  const user = useSelector(selectUser);

  return (
    <div className={css.userAvatarContainer}>
      <p className={css.userName}>{user.name}</p>
      <p className={css.userAvatar}>{user.name[0]}</p>
    </div>
  );
}
