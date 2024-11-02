import { useFormContext } from "react-hook-form";
import { useState } from "react";
import PasswordVisibilityButton from "../PasswordVisibilityButton/PasswordVisibilityButton.jsx";
import { MdError } from "react-icons/md";

import css from "./InputField.module.css";

export default function InputField({ name, label, type = "text", placeholder, setValue }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleClick = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={css.inputGroup}>
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
      <input
        id={name}
        type={type === "password" && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        {...register(name)}
        className={`${css.inputField} ${errors[name] ? css.inputError : ""}`}
      />
      {errors[name] && (
        <p className={css.errorMessage}>
          <MdError size={16} /> {errors[name]?.message}
        </p>
      )}
      {name === "password" && <PasswordVisibilityButton onClick={handleClick} visible={isPasswordVisible} />}
    </div>
  );
}
