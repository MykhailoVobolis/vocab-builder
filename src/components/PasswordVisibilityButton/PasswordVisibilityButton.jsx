import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import css from "./PasswordVisibilityButton.module.css";

export default function PasswordVisibilityButton({ onClick, visible }) {
  return (
    <button className={css.passwordVisibilityButton} type="button" onClick={onClick}>
      {!visible ? <FiEyeOff className={css.buttonIcon} size={20} /> : <FiEye className={css.buttonIcon} size={20} />}
    </button>
  );
}
