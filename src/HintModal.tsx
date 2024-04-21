import React, { ReactNode, useEffect, useRef } from 'react';
import './HintModal.css'

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 children: ReactNode;
}

const HintModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
 if (!isOpen) {
    return null;
 }

 const modalContentRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
       if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
          onClose();
       }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
       document.removeEventListener('mousedown', handleClickOutside);
    };
 }, [onClose]);

 return (
    <div className="modal">
      <div className="modal-content" ref={modalContentRef}>
        {children}
      </div>
    </div>
 );
};

export default HintModal;
