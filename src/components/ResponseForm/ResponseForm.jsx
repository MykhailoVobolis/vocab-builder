import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, clearResponse } from "../../redux/training/slice.js";
import LanguageFlagWithName from "../LanguageFlagWithName/LanguageFlagWithName.jsx";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { selectResponse, selectTotalResponse, selectTotalTasks } from "../../redux/training/selectors.js";
import { sendRespons } from "../../redux/training/operations.js";
import toast from "react-hot-toast";
import FormButton from "../FormButton/FormButton.jsx";
import CancelButton from "../CancelButton/CancelButton.jsx";
import { openModal } from "../../redux/modal/slice.js";

import css from "./ResponseForm.module.css";

export default function ResponseForm({ currentTask, switchTask, handleClose, progress }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, getValues } = useForm();

  const totalTasks = useSelector(selectTotalTasks);
  const totalRespons = useSelector(selectTotalResponse);
  const userAnswers = useSelector(selectResponse);

  const { _id, en, ua, task } = currentTask;
  const placeholderText = ua ? "Enter task here" : "Введіть переклад";
  const iconName = task === "en" ? "icon-unitedKingdom" : "icon-ukraine";
  const language = ua ? "English" : "Ukrainian";

  const handleNextClick = () => {
    if (totalRespons >= totalTasks) {
      return;
    }
    const data = getValues(); // отримуємо значення інпуту
    const newAnswer = {
      _id,
      en: en || data.answer.trim(),
      ua: ua || data.answer.trim(),
      task,
    };

    if (data.answer) {
      dispatch(addAnswer(newAnswer));
    }
    switchTask();
    reset();
  };

  const handleSave = () => {
    const data = getValues();
    if (data.answer) {
      // Додаємо поточну відповідь до масиву
      const newAnswer = {
        _id,
        en: en || data.answer.trim(),
        ua: ua || data.answer.trim(),
        task,
      };
      const newAnswerArray = [...userAnswers, newAnswer];
      // Відправляємо масив відповідей на бекенд
      dispatch(sendRespons(newAnswerArray))
        .unwrap()
        .then((response) => {
          dispatch(openModal("resultsTraining"));
          dispatch(clearResponse());
          switchTask();
          reset();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  // Запобігаємо типовій поведінці Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className={css.responseWrapper}>
      <form className={css.formWrapper} onSubmit={handleSubmit(handleSave)}>
        <input
          className={css.inputAnswer}
          type="text"
          {...register("answer", { required: true })}
          placeholder={placeholderText}
          onKeyDown={handleKeyDown}
          disabled={progress >= totalTasks}
        />
        {progress < totalTasks - 1 && (
          <button className={css.nextBtn} type="button" onClick={handleNextClick}>
            Next
            <HiOutlineArrowNarrowRight className={css.nextBtnIcon} size={20} />
          </button>
        )}
        <div className={css.buttonGroup}>
          <FormButton onSubmit={handleSubmit} variant="answerSaveButton">
            Save
          </FormButton>
          <CancelButton onClose={handleClose} variant="answerCancelButton">
            Cancel
          </CancelButton>
        </div>
      </form>
      <LanguageFlagWithName iconName={iconName} language={language} />
    </div>
  );
}
