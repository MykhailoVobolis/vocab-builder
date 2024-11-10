import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import debounce from "lodash.debounce";
import SearchInputField from "../SearchInputField/SearchInputField.jsx";
import RadioField from "../RadioField/RadioField.jsx";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";
import { selectCategories } from "../../redux/words/selectors.js";
import { useDispatch, useSelector } from "react-redux";

import css from "./Filters.module.css";
import { getWordsOwn } from "../../redux/words/operations.js";

export default function Filters() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const methods = useForm();
  const { handleSubmit, watch } = methods;

  // Використовуємо watch для відстеження змін category
  const category = methods.watch("category");

  useEffect(() => {
    if (category !== "verb") {
      methods.setValue("isIrregular", null);
    }
  }, [category, methods]);

  const onSubmit = (data) => {
    const filterData = {
      keyword: data.keyword?.trim(),
      category: data.category,
      ...(data.category === "verb" && { isIrregular: data.isIrregular }),
    };
    dispatch(getWordsOwn(filterData));
  };

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
        <CustomSelect name="category" label="Category" options={categories} />
        {category === "verb" && <RadioField name="isIrregular" label="IsIrregular" />}
      </form>
    </FormProvider>
  );
}
