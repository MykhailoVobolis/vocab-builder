import ImageBanner from "../../components/ImageBanner/ImageBanner.jsx";
import MainBanner from "../../components/MainBanner/MainBanner.jsx";

import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <section className={css.pageContainer}>
      <div className={css.container}>
        <MainBanner
          title={"Register"}
          text={"To start using our services, please fill out the registration form below. All fields are mandatory:"}
          type={"register"}
          linkTo={"login"}
        />
        <ImageBanner />
      </div>
    </section>
  );
}
