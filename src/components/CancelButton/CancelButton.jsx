import css from "./CancelButton.module.css";

export default function CancelButton({ children, onClose }) {
  return (
    <button className={css.cancelButton} type="button" onClick={onClose}>
      {children}
    </button>
  );
}
