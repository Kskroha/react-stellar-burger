import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import classNames from 'classnames';
import ModalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal(props) {
  const modalRoot = document.getElementById("modal");

  const { onClose, children, header } = props;

  const onKeydown = ({key}) => {
    if (key === 'Escape') {
      onClose()
      return;
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  })

  return createPortal(
    (
      <>
        <ModalOverlay onClose={onClose}/>
        <div className={ModalStyles.window} onClick={(e)=>e.stopPropagation()}>
          {header && <span className={classNames(ModalStyles.header, "text text_type_main-medium")}>{header}</span>}
          <button className={ModalStyles.button} type="button" onClick={onClose}><CloseIcon type="primary" /></button>
          <div className={ModalStyles.content}>
            {children}
          </div>
        </div>
      </>
    ),
  modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
  header: PropTypes.string
};

export default Modal;
