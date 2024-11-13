import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../Helpers/capitalizeFirstLetter.js";
import { addCurrentWord } from "../../redux/words/slice.js";
import { addWord, getStatistics } from "../../redux/words/operations.js";

import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import WordBarPopover from "../WordBarPopover/WordBarPopover.jsx";
import SvgIcon from "../SvgIcon.jsx";

import css from "./WordsTable.module.css";

const columnHelper = createColumnHelper();

export default function WordsTable({ words }) {
  const [activeWordId, setActiveWordId] = useState(null); // Зберігаємо ID активного рядка
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isDictionary = pathname.includes("dictionary");

  function toggleMenu(rowData) {
    dispatch(addCurrentWord(rowData));
    setActiveWordId((prevWordId) => (prevWordId === rowData._id ? null : rowData._id));
  }

  function addToDictionary(rowData) {
    // Створення нового об'єкта без властивості _id
    const { _id, ...newWord } = rowData;
    dispatch(addWord(newWord))
      .unwrap()
      .then((response) => {
        dispatch(getStatistics());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  // Закриття WordBarPopover при кліку у будь яке місце екрану
  useEffect(() => {
    // Функція, яка викликається при кліку
    function handleClick(event) {
      // Перевіряємо, чи клік був не на кнопці чи її дочірніх елементах
      if (event.target.closest("button")) {
        return;
      }
      // Клік на екран
      setActiveWordId(null);
    }
    // Додаємо обробник подій на документ при завантаженні компонента
    document.addEventListener("click", handleClick);
    // Видаляємо обробник подій при демонтажі компонента
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Налаштування колонок таблиці
  const columns = [
    columnHelper.accessor("en", {
      header: () => (
        <div className={css.headerTabContainer}>
          <span>Word</span>
          <SvgIcon name="icon-unitedKingdom" width={32} height={32} className={css.icon} />
        </div>
      ),
      cell: (info) => info.getValue(), // Значення комірки (отримується за допомогою info.getValue())
    }),
    columnHelper.accessor("ua", {
      header: () => (
        <div className={css.headerTabContainer}>
          <span>Translation</span>
          <SvgIcon name="icon-ukraine" width={32} height={32} className={css.icon} />
        </div>
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      header: () => "Category",
      cell: (info) => capitalizeFirstLetter(info.getValue()),
    }),

    // Умовне додавання колонки "Progress"
    ...(isDictionary
      ? [
          columnHelper.accessor("progress", {
            header: () => "Progress",
            cell: (info) => (
              <div className={css.progressWrapper}>
                <p>{`${info.getValue()}%`}</p>
                <ProgressBar
                  progress={info.getValue()}
                  size={26}
                  dark="var(--progressDark)"
                  light="var(--progressLight)"
                  thicknessDark={6}
                  thicknessLight={4}
                />
              </div>
            ),
          }),
        ]
      : []),

    columnHelper.display({
      id: "button", // ID для колонки
      header: () => "", // Заголовок колонки
      cell: (info) => (
        <div className={css.actionBardWrapper}>
          {isDictionary ? (
            <button className={css.actionButton} onClick={() => toggleMenu(info.row.original)}>
              ...
            </button>
          ) : (
            <button className={css.addWordBtn} onClick={() => addToDictionary(info.row.original)}>
              Add to dictionary
              <HiOutlineArrowNarrowRight className={css.addWordBtnIcon} size={20} />
            </button>
          )}
          {activeWordId === info.row.original._id && (
            <WordBarPopover toggleMenu={() => setActiveWordId(null)} wordId={activeWordId} />
          )}
        </div>
      ),
    }),
  ];

  // Ініціалізуємо таблицю з використанням useReactTable та передаємо дані і колонки
  const table = useReactTable({
    data: words, // Дані таблиці
    columns, // Колонки
    getCoreRowModel: getCoreRowModel(), // Базова модель рядків
  });

  return (
    <div className={css.tableWrapper}>
      <div className={css.tableContainer}>
        <table className={css.table}>
          {/* Заголовок таблиці */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={
                      isDictionary ? css[`columnDictionary-${index + 1}`] : css[`columnRecommend-${index + 1}`]
                    }>
                    {/* Рендерить заголовок колонки або залишає комірку порожньою */}
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Тіло таблиці */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={
                      isDictionary ? css[`columnDictionary-${index + 1}`] : css[`columnRecommend-${index + 1}`]
                    }>
                    {/* Рендерить значення комірки */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
