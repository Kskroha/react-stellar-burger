import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from "./modal.module.css";
import { useNavigate } from "react-router-dom";
import { CLOSE_MODAL } from "../../services/actions/order-details";
import { useDispatch, useSelector } from "react-redux";

function Modal(props) {
  const modalRoot = document.getElementById("modal");
  const { header, children } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.orderDetails.isOpen);

  React.useEffect(() => {
    const onKeydown = ({ key }) => {
      if (key === "Escape") {
        onClose();
        return;
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  const onClose = (e) => {
    e.stopPropagation();
    if (isOpen) {
      return dispatch({
        type: CLOSE_MODAL,
      });
    }
    navigate("/");
  };

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={ModalStyles.window} onClick={(e) => e.stopPropagation()}>
        {header && (
          <span
            className={classNames(
              ModalStyles.header,
              "text text_type_main-medium"
            )}
          >
            {header}
          </span>
        )}
        <button className={ModalStyles.button} type="button" onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        <div className={ModalStyles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
  header: PropTypes.string,
};

export default Modal;
