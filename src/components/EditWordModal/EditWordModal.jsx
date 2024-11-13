import { useSelector } from "react-redux";
import { selectCurrentWord } from "../../redux/words/selectors.js";

import EditWordForm from "../EditWordForm/EditWordForm.jsx";

import css from "./EditWordModal.module.css";

export default function EditWordModal({ onClose }) {
  const currentWord = useSelector(selectCurrentWord);

  return (
    <div className={css.modalWrapper}>
      <EditWordForm onClose={onClose} currentWord={currentWord} />
    </div>
  );
}
