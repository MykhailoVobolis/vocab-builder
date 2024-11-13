import { useFormContext } from "react-hook-form";
import { LuSearch } from "react-icons/lu";

import css from "./SearchInputField.module.css";

export default function SearchInputField({ name, label, placeholder }) {
  const { register } = useFormContext();

  return (
    <div className={css.inputContainer}>
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
      <input className={css.searchInputField} id={name} type="text" placeholder={placeholder} {...register(name)} />
      <LuSearch className={css.searchIcon} size={20} />
    </div>
  );
}
