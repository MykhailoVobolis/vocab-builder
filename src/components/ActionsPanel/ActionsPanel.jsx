import { useLocation } from "react-router-dom";
import AddWordBtn from "../AddWordBtn/AddWordBtn.jsx";
import TrainLink from "../TrainLink/TrainLink.jsx";

import css from "./ActionsPanel.module.css";

export default function ActionsPanel() {
  const { pathname } = useLocation();

  return (
    <div className={css.panelContainer}>
      {pathname.includes("dictionary") && <AddWordBtn />}
      <TrainLink />
    </div>
  );
}
