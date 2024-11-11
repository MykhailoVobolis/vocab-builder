import LanguageFlagWithName from "../LanguageFlagWithName/LanguageFlagWithName.jsx";

import css from "./TaskWordBlock.module.css";

export default function TaskWordBlock({ currentTask }) {
  const { en, ua, task } = currentTask;
  const iconName = task === "en" ? "icon-ukraine" : "icon-unitedKingdom";
  const wordTask = ua ? ua : en;
  const language = ua ? "Ukrainian" : "English";

  return (
    <div className={css.wordBlockWrapper}>
      <div className={css.contentContainer}>
        <p className={css.wordTask}>{wordTask}</p>
        <LanguageFlagWithName iconName={iconName} language={language} />
      </div>
    </div>
  );
}
