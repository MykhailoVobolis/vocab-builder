import clsx from "clsx";
import css from "./FormButton.module.css";

export default function FormButton({ variant, children, disabled = false }) {
  return (
    <button className={clsx(css.formButton, css[variant])} type="submit" disabled={disabled}>
      {children}
    </button>
  );
}
