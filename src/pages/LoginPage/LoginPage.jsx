import ImageBanner from "../../components/ImageBanner/ImageBanner.jsx";
import MainBanner from "../../components/MainBanner/MainBanner.jsx";

import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <section className={css.pageContainer}>
      <div className={css.container}>
        <MainBanner
          title={"Login"}
          text={"Please enter your login details to continue using our service:"}
          type={"login"}
          linkTo={"register"}
        />
        <ImageBanner />
      </div>
    </section>
  );
}
