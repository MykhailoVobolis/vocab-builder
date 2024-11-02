import { Link } from "react-router-dom";
import SignUpForm from "../AuthForm/AuthForm.jsx";
import css from "./MainBanner.module.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
