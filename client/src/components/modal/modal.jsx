import './modal.scss';
import React from 'react';

export function Modal({closeModal, children}) {
  return (
    <div className="Modal" onClick={closeOnOverlayClick} data-test="modal-overlay">
      <div className="Modal-Content" data-test="modal-card" tabIndex="0">
        {children}
      </div>
    </div>
  );

  function closeOnOverlayClick(event) {
    const overlayEl = event.currentTarget;
    if (overlayEl === event.target) {
      closeModal();
    }
  }
}
