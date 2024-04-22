import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SeatingTable from '../SeatingTableComponents/SeatingTable';

function SeatingTalbePopup({ show, onHide, table }) {
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            {table && <SeatingTable item={table} index={table.seating_table_id} />}
        </Modal>
    );
}

export default SeatingTalbePopup;
