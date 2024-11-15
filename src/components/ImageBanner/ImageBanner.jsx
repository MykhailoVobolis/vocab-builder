import { useMedia } from "react-use";
import { useLocation } from "react-router-dom";

import MainPicture from "../MainPicture/MainPicture.jsx";

import css from "./ImageBanner.module.css";

export default function ImageBanner() {
  const { pathname } = useLocation();
  const isMobile = useMedia("(max-width: 767px)");
  const isDesktop = useMedia("(min-width: 1440px)");
  const isRegister = pathname.includes("register");

  const visible = !(isMobile && isRegister);

  return (
    <div className={css.container}>
      {(isMobile || isDesktop) && <MainPicture />}
      {visible && (
        <ul className={css.descList}>
          <li className={css.afterElement}>Word</li>
          <li className={css.afterElement}>Translation</li>
          <li className={css.afterElement}>Grammar</li>
          <li>Progress</li>
        </ul>
      )}
    </div>
  );
}
