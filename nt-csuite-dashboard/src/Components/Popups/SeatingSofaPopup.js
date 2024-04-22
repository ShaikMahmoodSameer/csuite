import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SeatingSofa from '../SeatingTableComponents/SeatingSofa';

function SeatingSofaPopup({ show, onHide, sofa }) {
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            {sofa && <SeatingSofa sofa={sofa} />}
        </Modal>
    );
}

export default SeatingSofaPopup;
