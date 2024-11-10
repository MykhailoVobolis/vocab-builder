import { nanoid } from "nanoid";
import { useFormContext } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../Helpers/capitalizeFirstLetter.js";
import { IoChevronDown } from "react-icons/io5";
import { MdError } from "react-icons/md";

import css from "./CustomSelect.module.css";

export default function CustomSelect({ name, options, categoryValue = "Categories", formType }) {
  const {
    register,
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Categories");
  const selectRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setValue(name, option); // Передаємо значення у форму
    trigger(name); // Запускаємо валідацію для поля `name`
    setIsOpen(false);
  };

  // Закриття OptionsList при кліку у будь яке місце екрану
  useEffect(() => {
    function handleClickOutside(event) {
      // Перевіряємо, чи клік був за межами компонента
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${formType === "words" ? css.modalCustomSelect : css.customSelect} ${
        errors[name] ? css.inputError : ""
      }`}
      ref={selectRef}
      onClick={() => setIsOpen(!isOpen)}>
      <div className={css.selectedOption}>
        <p className={css.selectPlaceholder}>
          {formType === "words"
            ? capitalizeFirstLetter(selectedOption)
            : categoryValue !== ""
            ? capitalizeFirstLetter(categoryValue)
            : "Categories"}
        </p>
        <IoChevronDown
          className={`${formType === "words" ? css.modalSelectIcon : css.selectIcon} ${isOpen ? css.isOpen : ""}`}
          size={20}
        />
      </div>
      {isOpen && (
        <ul className={formType === "words" ? css.modalOptionsList : css.optionsList}>
          {formType !== "words" && (
            <li className={css.optionItem} onClick={() => handleOptionClick("")}>
              All
            </li>
          )}
          {options.map((option) => (
            <li key={nanoid()} className={css.optionItem} onClick={() => handleOptionClick(option)}>
              {capitalizeFirstLetter(option)}
            </li>
          ))}
        </ul>
      )}
      <input type="hidden" {...register(name)} value={categoryValue} />
      {errors[name] && (
        <p className={css.errorMessage}>
          <MdError size={16} /> {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
