import { useMedia } from "react-use";

import heroImg from "../../assets/images/heroImg.png";
import heroImg2x from "../../assets/images/heroImg@2x.png";
// import heroImgMob from "../../assets/images/heroImg-mob.png";
// import heroImgMob2x from "../../assets/images/heroImg-mob@2x.png";

import css from "./MainPicture.module.css";

export default function MainPicture() {
  const isTablet = useMedia("(max-width: 768px)");

  return (
    <picture>
      {/* {isTablet ? (
        // <>
        //   <source srcSet={heroImgMob2x} type="image/png" media="(min-resolution: 2dppx)" />
        //   <img src={heroImgMob} alt="Hero Image" width="300" height="435" />
        // </>
        <>
          <source srcSet={heroImg2x} type="image/png" media="(min-resolution: 2dppx)" />
          <img src={heroImg} alt="Hero Image" width="247" height="191" />
        </>
      ) : (
        <>
          <source srcSet={heroImg2x} type="image/png" media="(min-resolution: 2dppx)" />
          <img src={heroImg} alt="Hero Image" width="498" height="435" />
        </>
      )} */}
      <>
        <source srcSet={heroImg2x} type="image/png" media="(min-resolution: 2dppx)" />
        <img className={css.heroImage} src={heroImg} alt="Hero Image" width="498" height="435" />
      </>
    </picture>
  );
}
