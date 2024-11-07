import css from "./FormButton.module.css";

export default function FormButton({ children, btnStyles }) {
  return (
    <button type="submit" className={btnStyles === "addWord" ? css.wordsFormButton : css.formButton}>
      {children}
    </button>
  );
}
