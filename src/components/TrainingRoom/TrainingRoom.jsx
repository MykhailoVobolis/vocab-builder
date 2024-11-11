import { useState } from "react";
import ResponseForm from "../ResponseForm/ResponseForm.jsx";
import TaskWordBlock from "../TaskWordBlock/TaskWordBlock.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectResponse } from "../../redux/training/selectors.js";
import FormButton from "../FormButton/FormButton.jsx";
import CancelButton from "../CancelButton/CancelButton.jsx";
import { clearResponse } from "../../redux/training/slice.js";
import { useNavigate } from "react-router-dom";

import css from "./TrainingRoom.module.css";

export default function TrainingRoom({ tasks }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const response = useSelector(selectResponse);

  const switchTask = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 < tasks.length ? prevIndex + 1 : prevIndex));
  };

  const currentTask = tasks[currentIndex];
  const isDisabled = response.length <= 0;

  const handleClose = () => {
    dispatch(clearResponse());
    navigate("/dictionary");
  };

  //   console.log(response);

  return (
    <div className={css.trainingRoomContainer}>
      <div className={css.tasksContainer}>
        <ResponseForm currentTask={currentTask} switchTask={switchTask} />
        <TaskWordBlock currentTask={currentTask} />
      </div>
      <div className={css.buttonGroup}>
        <FormButton variant="answerSaveButton" disabled={isDisabled}>
          Save
        </FormButton>
        <CancelButton onClose={handleClose} variant="answerCancelButton">
          Cancel
        </CancelButton>
      </div>
    </div>
  );
}
