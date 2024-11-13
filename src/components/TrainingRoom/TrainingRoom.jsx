import { useDispatch } from "react-redux";
import { clearResponse } from "../../redux/training/slice.js";
import { useNavigate } from "react-router-dom";

import ResponseForm from "../ResponseForm/ResponseForm.jsx";
import TaskWordBlock from "../TaskWordBlock/TaskWordBlock.jsx";

import css from "./TrainingRoom.module.css";

export default function TrainingRoom({ currentTask, switchTask, progress }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(clearResponse());
    navigate("/dictionary");
  };

  return (
    <div className={css.trainingRoomContainer}>
      <div className={css.tasksContainer}>
        <ResponseForm currentTask={currentTask} switchTask={switchTask} handleClose={handleClose} progress={progress} />
        <TaskWordBlock currentTask={currentTask} />
      </div>
    </div>
  );
}
