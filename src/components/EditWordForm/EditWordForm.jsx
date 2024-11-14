import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editWordSchema } from "../../utils/validationSchemas.js";
import { editWord, getWordsOwn } from "../../redux/words/operations.js";

import InputWordField from "../InputWordField/InputWordField.jsx";
import CancelButton from "../CancelButton/CancelButton.jsx";
import FormButton from "../FormButton/FormButton.jsx";

import css from "./EditWordForm.module.css";

export default function EditWordForm({ onClose, currentWord }) {
  const dispatch = useDispatch();

  const { category, en, ua, isIrregular = true, _id } = currentWord;

  const methods = useForm({
    resolver: yupResolver(editWordSchema),
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: {
      ua: ua,
      en: en,
    },
  });

  const onSubmit = (data) => {
    const saveWordData = {
      en: data.en?.trim(),
      ua: data.ua?.trim(),
      category: category,
      isIrregular: isIrregular,
      wordId: _id,
    };

    dispatch(editWord(saveWordData))
      .unwrap()
      .then((response) => {
        methods.reset();
        onClose();
        dispatch(getWordsOwn());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <FormProvider {...methods}>
      <form className={css.formContainer} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={css.imputContainer}>
          <InputWordField name="ua" label="Ukrainian" placeholder="Працювати" iconName="icon-ukraine" />
          <InputWordField name="en" label="English" placeholder="Work" iconName="icon-unitedKingdom" />
        </div>
        <div className={css.buttonGroup}>
          <FormButton variant="wordsFormButton">Save</FormButton>
          <CancelButton onClose={onClose}>Cancel</CancelButton>
        </div>
      </form>
    </FormProvider>
  );
}
