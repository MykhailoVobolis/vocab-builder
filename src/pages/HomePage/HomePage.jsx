import { Link } from "react-router-dom";
import ImageBanner from "../../components/ImageBanner/ImageBanner.jsx";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.pageContainer}>
      <div className={css.container}>
        <div className={css.titleWrap}>
          <h1 className={css.title}>Vocabulary growth platform</h1>
          <p className={css.about}>
            Record and enhance your vocabulary daily through interactive exercises and personalized learning paths.
            Track your progress and unlock new words effortlessly!
          </p>
          <ul className={css.navList}>
            <li>
              <Link className={css.registerLink} to="register">
                Register
              </Link>
            </li>
            <li>
              <Link className={css.loginLink} to="login">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <ImageBanner />
      </div>
    </section>
  );
}
