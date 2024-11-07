import { Link } from "react-router-dom";
import SignUpForm from "../AuthForm/AuthForm.jsx";
import { capitalizeFirstLetter } from "../../Helpers/capitalizeFirstLetter.js";

import css from "./MainBanner.module.css";

export default function MainBanner({ title, text, linkTo, type }) {
  return (
    <div className={css.titleWrap}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.about}>{text}</p>
      <SignUpForm type={type} title={title} />
      <Link className={css.loginLink} to={`/${linkTo}`}>
        {capitalizeFirstLetter(linkTo)}
      </Link>
    </div>
  );
}
