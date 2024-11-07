import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import css from "./TrainLink.module.css";

export default function TrainLink() {
  return (
    <Link to="/training" className={css.trainLink}>
      <span>Train oneself</span>
      <HiOutlineArrowNarrowRight className={css.lincIcon} size={20} />
    </Link>
  );
}
