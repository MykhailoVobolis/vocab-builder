import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectFilterDictionary, selectFilterRecomend } from "../../redux/filters/selectors.js";

import css from "./RadioField.module.css";

export default function RadioField({ name, label, isDictionary }) {
  const { register } = useFormContext();

  const { isIrregular } = useSelector(isDictionary ? selectFilterDictionary : selectFilterRecomend);

  return (
    <div className={css.radioGroup}>
      <label className={css.label}>{label}</label>
      <div className={css.labelContainer}>
        <label className={css.radioItem} htmlFor="regular">
          <input
            className={css.hiddenRadioButton}
            id="regular"
            type="radio"
            value="false"
            checked={isIrregular === "false"}
            {...register(name)}
          />
          <span className={css.customRadio}></span>
          <span className={css.labelText}>Regular</span>
        </label>
        <label className={css.radioItem} htmlFor="irregular">
          <input
            className={css.hiddenRadioButton}
            id="irregular"
            type="radio"
            value="true"
            checked={isIrregular === "true"}
            {...register(name)}
          />
          <span className={css.customRadio}></span>
          <span className={css.labelText}>Irregular</span>
        </label>
      </div>
    </div>
  );
}
