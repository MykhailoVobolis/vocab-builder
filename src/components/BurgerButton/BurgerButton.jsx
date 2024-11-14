import { useDispatch } from "react-redux";
import { openModalMobile } from "../../redux/modal/slice.js";

import SvgIcon from "../SvgIcon.jsx";

import css from "./BurgerButton.module.css";

export default function BurgerButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModalMobile());
  };

  return (
    <button className={css.burgerBtn} onClick={() => handleClick()}>
      <SvgIcon className={css.burgerIcon} name="icon-burger" width={32} height={22} />
    </button>
  );
}
