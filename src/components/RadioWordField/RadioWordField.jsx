import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

import css from "./RadioWordField.module.css";

export default function RadioWordField({ name, label }) {
  const {
    register,

    formState: { errors },
  } = useFormContext();

  return (
    <div className={css.radioGroup}>
      <label className={css.label}>{label}</label>
      <div className={css.labelContainer}>
        <label className={css.radioItem} htmlFor="modaleRegular">
          <input className={css.hiddenRadioButton} id="modaleRegular" type="radio" value="false" {...register(name)} />
          <span className={css.customRadio}></span>
          <span className={css.labelText}>Regular</span>
        </label>
        <label className={css.radioItem} htmlFor="modaleIrregular">
          <input className={css.hiddenRadioButton} id="modaleIrregular" type="radio" value="true" {...register(name)} />
          <span className={css.customRadio}></span>
          <span className={css.labelText}>Irregular</span>
        </label>
      </div>
      {errors[name] && (
        <p className={css.errorMessage}>
          <MdError size={16} /> {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
