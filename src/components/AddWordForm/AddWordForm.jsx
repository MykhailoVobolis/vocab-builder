import toast from "react-hot-toast";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/words/selectors.js";
import { addWord, getStatistics, getWordsOwn } from "../../redux/words/operations.js";
import { wordsSchema } from "../../utils/validationSchemas.js";

import CustomSelect from "../CustomSelect/CustomSelect.jsx";
import FormButton from "../FormButton/FormButton.jsx";
import CancelButton from "../CancelButton/CancelButton.jsx";
import InputWordField from "../InputWordField/InputWordField.jsx";
import RadioWordField from "../RadioWordField/RadioWordField.jsx";

import css from "./AddWordForm.module.css";

export default function AddWordForm({ onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const methods = useForm({
    resolver: yupResolver(wordsSchema),
    mode: "all",
    reValidateMode: "onBlur", // Повторна валідація при втраті фокусу
  });

  // Використовуємо watch для відстеження змін category
  const category = methods.watch("category");
  const modalIsIrregular = methods.watch("modalIsIrregular");

  useEffect(() => {
    if (category !== "verb") {
      methods.setValue("modalIsIrregular", null);
    }
  }, [category, methods]);

  const onSubmit = (data) => {
    const addWordData = {
      en: data.en?.trim(),
      ua: data.ua?.trim(),
      category: data.category,
      ...(data.category === "verb" && { isIrregular: data.modalIsIrregular }),
    };

    dispatch(addWord(addWordData))
      .unwrap()
      .then((response) => {
        methods.reset();
        onClose();
        return Promise.all([dispatch(getStatistics()), dispatch(getWordsOwn())]);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <FormProvider {...methods}>
      <form className={css.formContainer} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={css.selectContainer}>
          <CustomSelect name="category" label="Category" options={categories} formType={"words"} />
          {category === "verb" && <RadioWordField name="modalIsIrregular" label="ModalIsIrregular" />}
          {modalIsIrregular === "true" && (
            <p className={css.hintText}>Such data must be entered in the format I form-II form-III form.</p>
          )}
        </div>
        <div className={css.imputContainer}>
          <InputWordField name="ua" label="Ukrainian" placeholder="Працювати" iconName="icon-ukraine" />
          <InputWordField name="en" label="English" placeholder="Work" iconName="icon-unitedKingdom" />
        </div>
        <div className={css.buttonGroup}>
          <FormButton variant="wordsFormButton">Add</FormButton>
          <CancelButton onClose={onClose}>Cancel</CancelButton>
        </div>
      </form>
    </FormProvider>
  );
}
