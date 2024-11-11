import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/training/operations.js";
import { selectTasks } from "../../redux/training/selectors.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom.jsx";

import css from "./TrainingPage.module.css";

export default function TrainingPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const totalTasks = tasks.length;

  const completedTasks = 8; // Кількість виконаних задач
  const progressPercentage = (completedTasks / totalTasks) * 100;

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <section className={css.pageContainer}>
      {tasks.length > 0 && (
        <div className={css.container}>
          <div className={css.progressBarWrapper}>
            <ProgressBar
              progress={progressPercentage}
              size={58}
              dark="var(--green)"
              light="var(--main-white)"
              thicknessDark={3}
              thicknessLight={4}
            />
            <p className={css.progressValue}>{totalTasks}</p>
          </div>
          <TrainingRoom tasks={tasks} />
        </div>
      )}
    </section>
  );
}
