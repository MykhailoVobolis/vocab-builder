import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import debounce from "lodash.debounce";
import SearchInputField from "../SearchInputField/SearchInputField.jsx";
import RadioField from "../RadioField/RadioField.jsx";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";
import { selectCategories, selectFilterDictionaryParams } from "../../redux/words/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { getWordsOwn } from "../../redux/words/operations.js";
import { changeFilterParams } from "../../redux/words/slice.js";

import css from "./Filters.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const filterParams = useSelector(selectFilterDictionaryParams);

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
      ...(data.category === "verb" && { isIrregular: data.isIrregular }),
    };
    dispatch(changeFilterParams(filterData));
  };

  useEffect(() => {
    dispatch(getWordsOwn(filterParams));
  }, [filterParams, dispatch]);

  // Создаем debounced версию onSubmit
  const debouncedSubmit = debounce(handleSubmit(onSubmit), 300);

  // Слушаем изменения в полях формы и вызываем debouncedSubmit
  useEffect(() => {
    const subscription = watch(() => {
      debouncedSubmit(); // Вызываем сабмит при изменениях с дебаунсом
    });

    return () => subscription.unsubscribe(); // Отписываемся при размонтировании
  }, [watch, debouncedSubmit]);

  return (
    <FormProvider {...methods}>
      <form className={css.searchForm}>
        <SearchInputField name="keyword" label="Keyword" placeholder="Find the word" />
        <CustomSelect name="category" label="Category" options={categories} categoryValue={categoryValue} />
        {category === "verb" && <RadioField name="isIrregular" label="IsIrregular" />}
      </form>
    </FormProvider>
  );
}
