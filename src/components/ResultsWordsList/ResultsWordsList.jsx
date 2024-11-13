import { nanoid } from "nanoid";
import css from "./ResultsWordsList.module.css";

export default function ResultsWordsList({ description, words }) {
  return (
    <div className={css.wordsListContainer}>
      <p className={css.description}>{description}</p>
      {words.length > 0 && (
        <ul>
          {words.map((word) => (
            <li className={css.listItem} key={nanoid()}>
              {word.task === "ua" ? word.en : word.ua}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
