import { useEffect, FC, ReactNode } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from "./modal.module.css";
import { CLOSE_MODAL } from "../../services/actions/order-details";
import { useDispatch } from "react-redux";

interface IModal {
  children?: ReactNode;
  handleClose?: () => void;
}

const Modal: FC<IModal> = ({ children, handleClose }) => {
  const modalRoot = document.getElementById("modal") as HTMLElement;
  const dispatch = useDispatch();

  useEffect(() => {
    const onKeydown = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        onClose();
        return;
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  const onClose = (
    e?: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e) {
      e.stopPropagation();
    }
    handleClose?.();
    return dispatch({
      type: CLOSE_MODAL,
    });
  };

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={ModalStyles.window} onClick={(e) => e.stopPropagation()}>
        <button className={ModalStyles.button} type="button" onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        <div className={ModalStyles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
