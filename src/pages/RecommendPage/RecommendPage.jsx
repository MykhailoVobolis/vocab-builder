import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import WordsPagination from "../../components/WordsPagination/WordsPagination.jsx";
import WordsTable from "../../components/WordsTable/WordsTable.jsx";
import { useSelector } from "react-redux";
import { selectRecomendWords } from "../../redux/words/selectors.js";

import css from "./RecommendPage.module.css";

export default function RecommendPage() {
  const { results } = useSelector(selectRecomendWords);

  return (
    <section className={css.pageContainer}>
      <div className={css.container}>
        <Dashboard />
        <WordsTable words={results} />
        {results.length > 0 && <WordsPagination />}
      </div>
    </section>
  );
}
