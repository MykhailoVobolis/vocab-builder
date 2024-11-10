import { useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import WordsPagination from "../../components/WordsPagination/WordsPagination.jsx";
import WordsTable from "../../components/WordsTable/WordsTable.jsx";
import { getCategories, getWordsOwn } from "../../redux/words/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectDictionary, selectFilterDictionaryParams } from "../../redux/words/selectors.js";

import css from "./DictionaryPage.module.css";

export default function DictionaryPage() {
  const dispatch = useDispatch();
  const dictionary = useSelector(selectDictionary);
  const filterParams = useSelector(selectFilterDictionaryParams);
  const { results } = dictionary;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWordsOwn(filterParams));
  }, [dispatch, filterParams]);

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
