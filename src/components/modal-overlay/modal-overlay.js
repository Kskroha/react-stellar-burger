import React from "react";
import PropTypes from "prop-types";
import ModalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ onClose }) {
  return (
    <div onClick={(e) => onClose(e)} className={ModalOverlayStyles.overlay} />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
