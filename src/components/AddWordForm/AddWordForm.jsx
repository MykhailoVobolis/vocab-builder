import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/words/selectors.js";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";
import FormButton from "../FormButton/FormButton.jsx";
import CancelButton from "../CancelButton/CancelButton.jsx";
import InputWordField from "../InputWordField/InputWordField.jsx";
import { wordsSchema } from "../../utils/validationSchemas.js";
import RadioWordField from "../RadioWordField/RadioWordField.jsx";
import { useEffect } from "react";

import css from "./AddWordForm.module.css";

export default function AddWordForm({ onClose }) {
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
      isIrregular: data.modalIsIrregular,
    };
    console.log("Form Data:", addWordData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={css.form}>
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
          <FormButton btnStyles={"addWord"}>Add</FormButton>
          <CancelButton onClose={onClose}>Cancel</CancelButton>
        </div>
      </form>
    </FormProvider>
  );
}