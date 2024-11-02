import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <p className={css.notFoundText}>404 | Sorry, page not found</p>
    </div>
  );
}
