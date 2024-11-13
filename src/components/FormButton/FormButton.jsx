import clsx from "clsx";
import css from "./FormButton.module.css";

export default function FormButton({ onSubmit, variant, children }) {
  return (
    <button className={clsx(css.formButton, css[variant])} type="submit" onClick={onSubmit}>
      {children}
    </button>
  );
}
