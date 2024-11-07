import Filters from "../Filters/Filters.jsx";
import Statistics from "../Statistics/Statistics.jsx";
import ActionsPanel from "../ActionsPanel/ActionsPanel.jsx";

import css from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={css.dashboard}>
      <Filters />
      <div className={css.dashboardSecondContainer}>
        <Statistics />
        <ActionsPanel />
      </div>
    </div>
  );
}
