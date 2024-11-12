import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice.js";
import { selectStateModal, selectTypeModal } from "../../redux/modal/selectors.js";

import AddWordModal from "../AddWordModal/AddWordModal.jsx";
import EditWordModal from "../EditWordModal/EditWordModal.jsx";
import ResultsTrainingModal from "../ResultsTrainingModal/ResultsTrainingModal.jsx";
import { clearResponse, clearResultsTraining } from "../../redux/training/slice.js";

import css from "./ModalWindow.module.css";
import { useNavigate } from "react-router-dom";

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

function addContentModal(modalType, onClose) {
  switch (modalType) {
    case "addWord":
      return <AddWordModal onClose={onClose} />;
    case "editWord":
      return <EditWordModal onClose={onClose} />;
    case "resultsTraining":
      return <ResultsTrainingModal onClose={onClose} />;
    default:
      return null;
  }
}

export default function ModalWindow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(selectStateModal);
  const modalType = useSelector(selectTypeModal);

  const onClose = () => {
    dispatch(closeModal());
    if (modalType === "resultsTraining") {
      dispatch(clearResultsTraining());
      dispatch(clearResponse());
      navigate("/dictionary");
    }
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
      {addContentModal(modalType, onClose)}
    </Modal>
  );
}
