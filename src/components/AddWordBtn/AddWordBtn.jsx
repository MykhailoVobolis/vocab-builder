import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/slice.js";

import css from "./AddWordBtn.module.css";

export default function AddWordBtn() {
  const dispatch = useDispatch();

  return (
    <button className={css.addWordBtn} type="button" onClick={() => dispatch(openModal("addWord"))}>
      <span>Add word</span>
      <FiPlus className={css.addWordIcon} size={20} />
    </button>
  );
}
