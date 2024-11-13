import MainPicture from "../MainPicture/MainPicture.jsx";

import css from "./ImageBanner.module.css";

export default function ImageBanner() {
  return (
    <div className={css.container}>
      <MainPicture />
      <ul className={css.descList}>
        <li className={css.afterElement}>Word</li>
        <li className={css.afterElement}>Translation</li>
        <li className={css.afterElement}>Grammar</li>
        <li>Progress</li>
      </ul>
    </div>
  );
}
