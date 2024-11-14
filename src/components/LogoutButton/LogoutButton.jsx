import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
import { HiOutlineArrowRight } from "react-icons/hi";
import { closeModalMobile } from "../../redux/modal/slice.js";

import css from "./LogoutButton.module.css";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeModalMobile());
    dispatch(logOut())
      .unwrap()
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <button className={css.logoutBtn} onClick={handleClick}>
      <span>Log out</span>
      <HiOutlineArrowRight className={css.logOutIcon} size={16} />
    </button>
  );
}
