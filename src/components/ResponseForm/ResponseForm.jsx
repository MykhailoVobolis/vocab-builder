import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAnswer } from "../../redux/training/slice.js";
import LanguageFlagWithName from "../LanguageFlagWithName/LanguageFlagWithName.jsx";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import css from "./ResponseForm.module.css";

export default function ResponseForm({ currentTask, switchTask }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const { _id, en, ua, task } = currentTask;
  const placeholderText = ua ? "Enter task here" : "Введіть переклад";
  const iconName = task === "en" ? "icon-unitedKingdom" : "icon-ukraine";
  const language = ua ? "English" : "Ukrainian";

  const onSubmit = (data) => {
    const newAnswer = {
      _id,
      en: en || data.answer.trim(),
      ua: ua || data.answer.trim(),
      task,
    };

    dispatch(addAnswer(newAnswer));
    switchTask();
    reset();
  };

  return (
    <div className={css.responseWrapper}>
      <form className={css.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={css.inputAnswer}
          type="text"
          {...register("answer", { required: true })} // реєструємо інпут в react-hook-form
          placeholder={placeholderText}
          autoFocus
        />
        <button className={css.nextBtn} type="submit">
          Next
          <HiOutlineArrowNarrowRight className={css.nextBtnIcon} size={20} />
        </button>
      </form>
      <LanguageFlagWithName iconName={iconName} language={language} />
    </div>
  );
}
