import SvgIcon from "../SvgIcon.jsx";
import css from "./LanguageFlagWithName.module.css";

export default function LanguageFlagWithName({ iconName, language }) {
  return (
    <div className={css.languageFlagContainer}>
      <SvgIcon name={iconName} width={32} height={32} />
      <p className={css.language}>{language}</p>
    </div>
  );
}
