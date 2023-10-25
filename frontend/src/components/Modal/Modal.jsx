import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
    const backDropOnClick = () => {
        props.onClose();
        props.setIsEditMode(false);
    };
    return <div className={classes.backdrop} onClick={backDropOnClick} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalOverlay = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop
                    onClose={props.onClose}
                    setIsEditMode={props.setIsEditMode}
                />,
                portalOverlay
            )}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalOverlay
            )}
        </React.Fragment>
    );
};

export default Modal;
