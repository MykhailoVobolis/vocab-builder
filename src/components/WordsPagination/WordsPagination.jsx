import { PaginationItem } from "@mui/material";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import { selectDictionary, selectRecomendWords } from "../../redux/words/selectors.js";
import { selectFilterDictionary, selectFilterRecomend } from "../../redux/filters/selectors.js";
import { changeDictionaryPage, changeRecomendPage } from "../../redux/filters/slice.js";
import { useLocation } from "react-router-dom";

import Pagination from "@mui/material/Pagination";

import css from "./WordsPagination.module.css";

export default function WordsPagination() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isDictionary = pathname.includes("dictionary");
  const { totalPages } = useSelector(isDictionary ? selectDictionary : selectRecomendWords);
  const { page } = useSelector(isDictionary ? selectFilterDictionary : selectFilterRecomend);

  const isMobile = useMedia("(max-width: 767px)");

  // Функція обробки зміни сторінки
  const handlePageChange = (event, value) => {
    if (isDictionary) {
      dispatch(changeDictionaryPage(value));
    } else {
      dispatch(changeRecomendPage(value));
    }
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
        siblingCount={isMobile ? -1 : 0}
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
