import { useMedia } from "react-use";
import { useSelector } from "react-redux";
import { selectSortedResult } from "../../redux/training/selectors.js";

import ResultsWordsList from "../ResultsWordsList/ResultsWordsList.jsx";
import bookFloating from "../../assets/images/book-floating.png";
import bookFloating2x from "../../assets/images/book-floating@2x.png";
import bookFloatingMob from "../../assets/images/book-floating-mob.png";
import bookFloatingMob2x from "../../assets/images/book-floating-mob@2x.png";

import css from "./ResultsTrainingModal.module.css";

export default function ResultsTrainingModal() {
  const { corrects, mistakes } = useSelector(selectSortedResult);
  const isTablet = useMedia("(max-width: 768px)");

  return (
    <div className={css.resultsWrapper}>
      <h2 className={css.title}>Well done</h2>
      <div className={css.resultsContainer}>
        <ResultsWordsList description="Сorrect answers:" words={corrects} />
        <ResultsWordsList description="Mistakes:" words={mistakes} />
      </div>
      <picture className={css.bookImage}>
        {isTablet ? (
          <>
            <source srcSet={bookFloatingMob2x} type="image/png" media="(min-resolution: 2dppx)" />
            <img src={bookFloatingMob} alt="Book Image" width="140" height="112" />
          </>
        ) : (
          <>
            <source srcSet={bookFloating2x} type="image/png" media="(min-resolution: 2dppx)" />
            <img src={bookFloating} alt="Book Image" width="212" height="179" />
          </>
        )}
      </picture>
    </div>
  );
}
