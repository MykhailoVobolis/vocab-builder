import heroImg from "../../assets/images/heroImg.png";
import heroImg2x from "../../assets/images/heroImg@2x.png";

import css from "./MainPicture.module.css";

export default function MainPicture() {
  return (
    <picture>
      <source srcSet={heroImg2x} type="image/png" media="(min-resolution: 2dppx)" />
      <img className={css.heroImage} src={heroImg} alt="Hero Image" width="498" height="435" />
    </picture>
  );
}
