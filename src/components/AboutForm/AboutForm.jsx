import css from "./AboutForm.module.css";

export default function AboutForm() {
  return (
    <>
      <h2 className={css.title}>Add word</h2>
      <p className={css.description}>
        Adding a new word to the dictionary is an important step in enriching the language base and expanding the
        vocabulary.
      </p>
    </>
  );
}
