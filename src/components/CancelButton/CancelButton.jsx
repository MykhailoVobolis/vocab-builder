import clsx from "clsx";
import css from "./CancelButton.module.css";

export default function CancelButton({ variant, children, onClose }) {
  return (
    <button className={clsx(css.cancelButton, css[variant])} type="button" onClick={onClose}>
      {children}
    </button>
  );
}
