import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getStatistics } from "../../redux/words/operations.js";

import css from "./Statistics.module.css";
import { selectWordsToStudy } from "../../redux/words/selectors.js";

export default function Statistics() {
  const dispatch = useDispatch();

  const wordsToStudy = useSelector(selectWordsToStudy);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  return (
    <div className={css.studyContainer}>
      <p className={css.title}>To study:</p>
      <p className={css.curentValue}>{wordsToStudy}</p>
    </div>
  );
}
