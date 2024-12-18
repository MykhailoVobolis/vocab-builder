import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/words/operations.js";
import { selectDictionary, selectLoading } from "../../redux/words/selectors.js";

import WordsTable from "../../components/WordsTable/WordsTable.jsx";
import WordsPagination from "../../components/WordsPagination/WordsPagination.jsx";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import CustomLoader from "../../components/CustomLoader/CustomLoader.jsx";

import css from "./DictionaryPage.module.css";

export default function DictionaryPage() {
  const dispatch = useDispatch();
  const { results } = useSelector(selectDictionary);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
