import AboutForm from "../AboutForm/AboutForm.jsx";
import AddWordForm from "../AddWordForm/AddWordForm.jsx";
import css from "./AddWordModal.module.css";

export default function AddWordModal({ onClose }) {
  return (
    <div className={css.modalWrapper}>
      <AboutForm />
      <AddWordForm onClose={onClose} />
    </div>
  );
}
