import css from "./CustomLoader.module.css";

export default function CustomLoader() {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.loader}></div>
    </div>
  );
}
