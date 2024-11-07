import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice.js";
import { selectStateModal } from "../../redux/modal/selectors.js";
import AddWordModal from "../AddWordModal/AddWordModal.jsx";

// import LoginModal from "../LoginModal/LoginModal.jsx";
// import RegistrationModal from "../RegistrationModal/RegistrationModal.jsx";
// import BookModal from "../BookModal/BookModal.jsx";
// import AuthMessage from "../AuthMessage/AuthMessage.jsx";

import css from "./ModalWindow.module.css";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: window.innerWidth < 768 ? "48px 16px" : "48px 64px",
    border: "none",
    borderRadius: "30px",
    maxHeight: "90vh",
    overflowY: "auto",
    scrollbarWidth: "none",
    backgroundColor: "var(--green)",
  },
};

// function addContentModal(modalType) {
//   switch (modalType) {
//     case "login":
//       return <LoginModal />;
//     case "register":
//       return <RegistrationModal />;
//     case "booking":
//       return <BookModal />;
//     case "message":
//       return <AuthMessage />;
//     default:
//       return null;
//   }
// }

export default function ModalWindow() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectStateModal);
  //   const modalType = useSelector(selectTypeModal);

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={{
        base: css.modalContainer,
        afterOpen: css.openedModalContainer,
        beforeClose: css.closedModalContainer,
      }}
      style={modalStyles}
      closeTimeoutMS={500}
      onRequestClose={onClose}>
      <button className={css.closeBtn} onClick={onClose}>
        <IoClose className={css.closeIcon} size={32} />
      </button>
      <AddWordModal onClose={onClose} />
      {/* {addContentModal(modalType)} */}
    </Modal>
  );
}
