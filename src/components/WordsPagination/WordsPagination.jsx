import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectDictionary } from "../../redux/words/selectors.js";

import css from "./WordsPagination.module.css";
import { changeDictionaryPage } from "../../redux/words/slice.js";

export default function WordsPagination() {
  const dispatch = useDispatch();
  const { totalPages, page } = useSelector(selectDictionary);

  // Функція обробки зміни сторінки
  const handlePageChange = (event, value) => {
    dispatch(changeDictionaryPage(value));
  };

  return (
    <div className={css.paginationWrapper}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange} // Обробник зміни сторінки
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: MdKeyboardArrowLeft,
              next: MdKeyboardArrowRight,
              first: MdKeyboardDoubleArrowLeft,
              last: MdKeyboardDoubleArrowRight,
            }}
            {...item}
          />
        )}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        siblingCount={0}
        sx={{
          // Стилізація всіх єлементів
          "& .MuiPaginationItem-root": {
            margin: "0 5px", // Змінює горизонтальний проміжок між елементами
            fontSize: "13px",
            fontWeight: "600",
            fontFamily: "MacPawFixelDisplay, sans-serif",
            color: "var(--black)",
            borderColor: "var(--border)",
            borderRadius: "8px",
            // Стилізація активного, обраного елемента
            "&.Mui-selected": {
              backgroundColor: "var(--green)",
              color: "var(--white)",
              border: "none",
              "&:hover": {
                // Задаємо відсутність зміни стилів на ховер для активного елемента
                backgroundColor: "var(--green)",
                border: "none",
              },
            },
          },
          // Стилізація тексту "..."
          "& .MuiPaginationItem-ellipsis": {
            color: "var(--black)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "6px 8px",
            margin: "0 5px",
            fontSize: "13px",
            fontWeight: "600",
          },
        }}
      />
    </div>
  );
}
