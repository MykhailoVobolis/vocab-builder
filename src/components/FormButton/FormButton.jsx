import css from "./FormButton.module.css";

export default function FormButton({ children }) {
  return (
    <button type="submit" className={css.formButton}>
      {children}
    </button>
  );
}