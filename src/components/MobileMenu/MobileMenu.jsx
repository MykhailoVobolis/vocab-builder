import { MdClose } from "react-icons/md";
import { useMedia } from "react-use";

import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import NavigationList from "../NavigationList/NavigationList.jsx";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";

import illustration from "../../assets/images/illustration.png";
import illustration2x from "../../assets/images/illustration@2x.png";
import illustrationTablet from "../../assets/images/illustration-tablet.png";
import illustrationTablet2x from "../../assets/images/illustration-tablet@2x.png";

import css from "./MobileMenu.module.css";

export default function MobileMenu({ onClose }) {
  const isTablet = useMedia("(min-width: 768px)");

  return (
    <div className={css.mobileMenu}>
      <button className={css.closeBtn} onClick={() => onClose()}>
        <MdClose size={isTablet ? 34 : 28} className={css.closeIcon} />
      </button>
      <UserAvatar variant="mobileMenu" />
      {isTablet ? (
        <picture className={css.mobileMenuImage}>
          <source srcSet={illustrationTablet2x} type="image/png" media="(min-resolution: 2dppx)" />
          <img src={illustrationTablet} alt="Tablet Menu Image" width="300px" height="435px" />
        </picture>
      ) : (
        <picture className={css.mobileMenuImage}>
          <source srcSet={illustration2x} type="image/png" media="(min-resolution: 2dppx)" />
          <img src={illustration} alt="Tablet Menu Image" width="185px" height="318px" />
        </picture>
      )}
      <NavigationList onClose={onClose} />
      <LogoutButton />
    </div>
  );
}
