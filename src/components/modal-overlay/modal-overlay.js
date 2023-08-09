import React from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onClose }) {
  return (
    <div onClick={() => onClose()} className={ModalOverlayStyles.overlay} />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
