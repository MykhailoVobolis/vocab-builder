import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteWord, getStatistics, getWordsOwn } from "../../redux/words/operations.js";
import { openModal } from "../../redux/modal/slice.js";

import SvgIcon from "../SvgIcon.jsx";

import css from "./WordBarPopover.module.css";

export default function WordBarPopover({ toggleMenu, wordId }) {
  const dispatch = useDispatch();

  const handleDeletWord = (wordId) => {
    dispatch(deleteWord(wordId))
      .unwrap()
      .then((response) => {
        toggleMenu();
        return Promise.all([dispatch(getStatistics()), dispatch(getWordsOwn())]);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleEditWord = () => {
    dispatch(openModal("editWord"));
    toggleMenu();
  };

  return (
    <div className={css.popoverContainer}>
      <button className={`${css.popoverBtn} ${css.settingBtn}`} onClick={handleEditWord}>
        <SvgIcon className={css.btnIcon} name="icon-edit" width={16} height={16} />
        <span>Edit</span>
      </button>
      <button className={css.popoverBtn} onClick={() => handleDeletWord(wordId)}>
        <SvgIcon className={css.btnIcon} name="icon-trash" width={16} height={16} />
        <span>Delete</span>
      </button>
    </div>
  );
}
