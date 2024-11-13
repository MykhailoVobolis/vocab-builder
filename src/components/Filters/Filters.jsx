import debounce from "lodash.debounce";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/words/selectors.js";
import { getAllWords, getWordsOwn } from "../../redux/words/operations.js";
import { selectFilterDictionary, selectFilterRecomend } from "../../redux/filters/selectors.js";
import {
  changeDictionaryPage,
  changeFilterDictionary,
  changeFilterRecomend,
  changeRecomendPage,
} from "../../redux/filters/slice.js";

import SearchInputField from "../SearchInputField/SearchInputField.jsx";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";
import RadioField from "../RadioField/RadioField.jsx";

import css from "./Filters.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const categories = useSelector(selectCategories);

  const isDictionary = pathname.includes("dictionary");
  const filterParams = useSelector(isDictionary ? selectFilterDictionary : selectFilterRecomend);

  const { keyword: keywordValue, category: categoryValue, isIrregular: isIrregularValue } = filterParams;

  const methods = useForm({
    defaultValues: {
      keyword: keywordValue,
    },
  });
  const { handleSubmit, watch } = methods;

  // Використовуємо watch для відстеження змін category
  const category = methods.watch("category");

  useEffect(() => {
    if (category !== "verb") {
      methods.setValue("isIrregular", null);
    } else {
      methods.setValue("isIrregular", isIrregularValue);
    }
  }, [category, methods, isIrregularValue]);

  const onSubmit = (data) => {
    const filterData = {
      keyword: data.keyword?.trim(),
      category: data.category,
      ...(data.category === "verb" ? { isIrregular: data.isIrregular } : { isIrregular: null }),
    };

    if (isDictionary) {
      dispatch(changeFilterDictionary(filterData));
      dispatch(changeDictionaryPage(1));
    } else {
      dispatch(changeFilterRecomend(filterData));
      dispatch(changeRecomendPage(1));
    }
  };

  useEffect(() => {
    pathname.includes("dictionary") ? dispatch(getWordsOwn(filterParams)) : dispatch(getAllWords(filterParams));
  }, [dispatch, filterParams]);

  // Створюємо debounced версію onSubmit
  const debouncedSubmit = debounce(handleSubmit(onSubmit), 300);

  // Слухаємо зміни в полях форми і викликаємо debouncedSubmit
  useEffect(() => {
    const subscription = watch(() => {
      debouncedSubmit(); // Викликаємо сабміт при змінах з дебаунсом
    });

    return () => subscription.unsubscribe(); // Відписуємося при розмонтуванні
  }, [watch, debouncedSubmit]);

  return (
    <FormProvider {...methods}>
      <form className={css.searchForm}>
        <SearchInputField name="keyword" label="Keyword" placeholder="Find the word" />
        <CustomSelect name="category" label="Category" options={categories} categoryValue={categoryValue} />
        {category === "verb" && <RadioField name="isIrregular" label="IsIrregular" isDictionary={isDictionary} />}
      </form>
    </FormProvider>
  );
}
