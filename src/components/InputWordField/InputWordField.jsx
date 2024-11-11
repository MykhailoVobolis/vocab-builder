import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import SvgIcon from "../SvgIcon.jsx";

import css from "./InputWordField.module.css";

export default function InputWordField({ name, label, type = "text", placeholder, iconName }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={css.inputGroup}>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`${css.inputField} ${errors[name] ? css.inputError : ""}`}
      />
      <label className={css.label} htmlFor={name}>
        <SvgIcon name={iconName} width={32} height={32} />
        <span>{label}</span>
      </label>
      {errors[name] && (
        <p className={css.errorMessage}>
          <MdError size={16} /> {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
