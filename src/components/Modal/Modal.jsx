import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import {PropTypes} from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, children}) {

       // eslint-disable-next-line react-hooks/exhaustive-deps
       const handleKeyDown = (evt) => {
       if (evt.code === 'Escape') {
              onClose();
              }
       }

      const backdropKeyDow = (evt) => {
              if (evt.currentTarget === evt.target) {
                onClose();     
              }
       }

       useEffect(() => {
              window.addEventListener('keydown', handleKeyDown);
              return () => {
                     window.removeEventListener('keydown', handleKeyDown);
              }
       }, [handleKeyDown]);

       return createPortal(
                   <div onClick={backdropKeyDow} className={s.overlay}>
        <div className={s.modal}>
            {children}
  </div>
</div>, modalRoot)
        }

Modal.propTypes = {
       onClose: PropTypes.func.isRequired,
       children: PropTypes.node.isRequired,
};
