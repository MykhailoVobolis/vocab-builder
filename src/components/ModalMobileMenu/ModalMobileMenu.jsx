import Modal from "react-modal";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";

import { useDispatch, useSelector } from "react-redux";
import { selectMobileMenuIsOpen } from "../../redux/modal/selectors.js";
import { closeModalMobile } from "../../redux/modal/slice.js";

import css from "./ModalMobileMenu.module.css";

Modal.setAppElement("#root");

export default function ModalMobileMenu() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectMobileMenuIsOpen);

  const onClose = () => {
    dispatch(closeModalMobile());
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={{
        base: css.modalContainer,
        afterOpen: css.afterModalContainerOpen,
        beforeClose: css.beforeModalContainerClose,
      }}
      className={{
        base: css.modalContent,
        afterOpen: css.afterModalContentOpen,
        beforeClose: css.beforeModalContentClose,
      }}
      closeTimeoutMS={500}
      onRequestClose={onClose}>
      <MobileMenu onClose={onClose} />
    </Modal>
  );
}
