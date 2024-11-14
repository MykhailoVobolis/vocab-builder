import { MdClose } from "react-icons/md";

import illustration from "../../assets/images/illustration.png";
import illustration2x from "../../assets/images/illustration@2x.png";
import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import NavigationList from "../NavigationList/NavigationList.jsx";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";

import css from "./MobileMenu.module.css";

export default function MobileMenu({ onClose }) {
  return (
    <div className={css.mobileMenu}>
      <button className={css.closeBtn} onClick={() => onClose()}>
        <MdClose size={32} className={css.closeIcon} />
      </button>
      <UserAvatar variant="mobileMenu" />
      <picture className={css.mobileMenuImage}>
        <source srcSet={illustration2x} type="image/png" media="(min-resolution: 2dppx)" />
        <img src={illustration} alt="Mobile Menu Image" width="185px" height="318px" />
      </picture>
      <NavigationList onClose={onClose} />
      <LogoutButton />
    </div>
  );
}
