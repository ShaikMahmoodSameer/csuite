import React from 'react';
import Modal from 'react-bootstrap/Modal';
import MeetingTbl from '../MeetingComponents/MeetingTbl';

function MeetingTblPopup({ show, onHide, mtngTbl }) {
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            { mtngTbl && <MeetingTbl mtngTbl={mtngTbl} /> }
        </Modal>
    );
}

export default MeetingTblPopup;
