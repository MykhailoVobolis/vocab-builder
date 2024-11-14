import { useMedia } from "react-use";

import SvgIcon from "../SvgIcon.jsx";

import css from "./LanguageFlagWithName.module.css";

export default function LanguageFlagWithName({ iconName, language }) {
  const isDesktop = useMedia("(min-width: 1024px)");

  return (
    <div className={css.languageFlagContainer}>
      <SvgIcon name={iconName} width={isDesktop ? 32 : 28} height={isDesktop ? 32 : 28} />
      <p className={css.language}>{language}</p>
    </div>
  );
}
