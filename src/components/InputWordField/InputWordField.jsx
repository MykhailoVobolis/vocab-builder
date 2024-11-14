import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { useMedia } from "react-use";

import SvgIcon from "../SvgIcon.jsx";

import css from "./InputWordField.module.css";

export default function InputWordField({ name, label, type = "text", placeholder, iconName }) {
  const isTablet = useMedia("(min-width: 768px)");

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
        <SvgIcon name={iconName} width={isTablet ? 32 : 28} height={isTablet ? 32 : 28} />
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
