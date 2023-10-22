import { FC } from 'react';
import ModalOverlayStyles from "./modal-overlay.module.css";

interface IModalOverlay {
  onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
  return (
    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => onClose(e)} className={ModalOverlayStyles.overlay} />
  );
}

export default ModalOverlay;
