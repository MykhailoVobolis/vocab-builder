import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/training/operations.js";
import { selectLoading, selectTasks } from "../../redux/training/selectors.js";
import { clearResponse } from "../../redux/training/slice.js";

import TrainingRoom from "../../components/TrainingRoom/TrainingRoom.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import EmptyWordList from "../../components/EmptyWordList/EmptyWordList.jsx";
import CustomLoader from "../../components/CustomLoader/CustomLoader.jsx";

import css from "./TrainingPage.module.css";

export default function TrainingPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const isLoading = useSelector(selectLoading);

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
    dispatch(clearResponse());
    dispatch(getTasks())
      .unwrap()
      .catch((error) => {
        toast.error(error.message);
      });
  }, [dispatch]);

  return isLoading ? (
    <CustomLoader />
  ) : (
    <section className={css.pageContainer}>
      {tasks.length > 0 ? (
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
      ) : (
        <EmptyWordList />
      )}
    </section>
  );
}
