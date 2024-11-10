import { useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import WordsPagination from "../../components/WordsPagination/WordsPagination.jsx";
import WordsTable from "../../components/WordsTable/WordsTable.jsx";
import { getCategories } from "../../redux/words/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectDictionary } from "../../redux/words/selectors.js";

import css from "./DictionaryPage.module.css";

export default function DictionaryPage() {
  const dispatch = useDispatch();
  const { results } = useSelector(selectDictionary);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
