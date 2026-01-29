// // components/Modal/Modal.tsx

"use client";

// Styles
import css from "./Modal.module.css";

// React components
import { createPortal } from "react-dom";
import { useEffect } from 'react';

// Types
type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
};

const Modal = ({ children, closeModal }: ModalProps) => {

// Сlose when clicking on backdrop
const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

// Close when clicking on esc
  useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      closeModal();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
	  };
	}, [closeModal]);

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        {children}
      </div>
    </div>, 
    document.body
  );
};

export default Modal;