import { useSelector } from "react-redux";
import { selectLoading, selectRecomendWords } from "../../redux/words/selectors.js";

import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import WordsPagination from "../../components/WordsPagination/WordsPagination.jsx";
import WordsTable from "../../components/WordsTable/WordsTable.jsx";
import CustomLoader from "../../components/CustomLoader/CustomLoader.jsx";

import css from "./RecommendPage.module.css";

export default function RecommendPage() {
  const { results } = useSelector(selectRecomendWords);
  const isLoading = useSelector(selectLoading);

  return (
    <section className={css.pageContainer}>
      <div className={css.container}>
        <Dashboard />
        {isLoading ? (
          <CustomLoader />
        ) : (
          <>
            <WordsTable words={results} />
            {results.length > 0 && <WordsPagination />}
          </>
        )}
      </div>
    </section>
  );
}
