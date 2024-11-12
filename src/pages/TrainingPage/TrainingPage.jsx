import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/training/operations.js";
import { selectTasks } from "../../redux/training/selectors.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom.jsx";
import { useState } from "react";

import css from "./TrainingPage.module.css";

export default function TrainingPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const switchTask = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 < tasks.length ? prevIndex + 1 : prevIndex));
    setProgress((prevProgress) => (prevProgress + 1 <= tasks.length ? prevProgress + 1 : prevProgress));
  };

  const currentTask = tasks[currentIndex];

  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (progress / totalTasks) * 100 : 0;

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
            <p className={css.progressValue}>{progress}</p>
          </div>
          <TrainingRoom tasks={tasks} currentTask={currentTask} switchTask={switchTask} progress={progress} />
        </div>
      )}
    </section>
  );
}
