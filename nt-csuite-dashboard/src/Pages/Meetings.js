import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import MeetingTblPopup from '../Components/Popups/MeetingTblPopup';
import { addMtngTbl, fetchMtngTbls } from '../utils/meetingTableUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MtngTblBox from '../Components/MeetingComponents/MtngTblBox';

function Meetings() {
  const [meetingTables, setMeetingTables] = useState([]);
  const [MeetingRoomPopupShow, setMeetingRoomPopupShow] = useState(false);
  const [selectedMeetinTable, setSelectedMeetinTable] = useState(null);
  const [isAddingMeetingTable, setIsAddingMeetingTable] = useState(false);

  const handleAddNewMtngTbl = async () => {
    setIsAddingMeetingTable(true);
    const isConfirmed = window.confirm(`Confirm Adding new Meeting Table "Meeting Table ${meetingTables.length + 1}"`);
    if (!isConfirmed) {
      setIsAddingMeetingTable(false);
      return;
    } else {
      await addMtngTbl(meetingTables, setMeetingTables);
      setIsAddingMeetingTable(false);
    }
  };

  useEffect(() => { fetchMtngTbls(setMeetingTables); }, []);

  return (
    <Wrapper>
      <h1>Meetings</h1>

      <div className="meetingRoomsWrpr d-flex-cc gap-2 flex-wrap border-top border-bottom p-4">
        {
          meetingTables.map((item, idx) => (
            <MtngTblBox 
              key={idx} 
              mtngTbl={item} 
              setMeetingRoomPopupShow={setMeetingRoomPopupShow}
              setSelectedMeetinTable={setSelectedMeetinTable}
            />
          ))
        }

        <div className="AddTableBox w-100 d-flex-cc">
          <button className="btn btn-outline-dark" onClick={handleAddNewMtngTbl} disabled={isAddingMeetingTable}>
            {isAddingMeetingTable ? 'Adding Meeting Table...' : 'Add Meeting Table'} <FontAwesomeIcon icon={faPlus} className='ms-4' />
          </button>
        </div>
      </div>

      <MeetingTblPopup show={MeetingRoomPopupShow} onHide={() => setMeetingRoomPopupShow(false)} mtngTbl={selectedMeetinTable} />
    </Wrapper>
  )
}

export default Meetings;

const Wrapper = styled.div``
