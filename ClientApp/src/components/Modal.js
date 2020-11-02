import React from 'react';
import '../styles.css';

function Modal({ open, children, onClose }) {
    if (!open) return null

    console.log("Modal is called");
    return (
        <>
            <div>
                <span className="close" onClick={onClose}>&times;</span>
                {/* <button onClick={onClose}>&times;</button> */}
            </div>
            <div className="modal">THIS SHOULD BE DISPLAYED WHY IS IT NOT</div>
        </>
    )
}

export default Modal;