// Modal.js
import React from "react";
import { Modal as BootstrapModal, Button } from "react-bootstrap";

const Modal = ({ show, onClose, onConfirm }) => {
    return (
        <BootstrapModal show={show} onHide={onClose}>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>Confirmar Eliminación</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>¿Estás seguro de que deseas eliminar este contacto?</BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Eliminar
                </Button>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};

export default Modal;
