import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AddGuestsToMtngTblInpField from './AddGuestsToMtngTblInpField';
import { fetchAllGuests } from '../../utils/guestsUtils';
import { fetchTblSessGuests } from '../../utils/meetingTableUtils';
import GeustTable from './GeustTable';

function TabPanel({ session, activeSession, index, mtngTbl, ...other }) {
  const [allGuests, setAllGuests] = useState([]);
  const [tblSesnGuests, setTblSesnGuests] = useState([]);
  const [addGuests, setAddGuests] = useState(false);

  const tblNo = mtngTbl.tbl_no;

  useEffect(() => { fetchAllGuests(setAllGuests) }, []);
  useEffect(() => { fetchTblSessGuests({ tblNo, session }, setTblSesnGuests) }, [tblNo, session])

  return (
    <div role="tabpanel" hidden={activeSession !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {activeSession === index && (
        <Box sx={{ p: 3 }}>
          <p className="small text"> Session Guests - {tblSesnGuests.length} </p>
          <div className="addedMemSecWrpr py-2 shadow-sm rounded-3 bg-white">
            <GeustTable tblSesnGuests={tblSesnGuests} />
          </div>

          <div className="mt-4">
            { !addGuests && 
              <button className="btn btn-outline-secondary" onClick={() => setAddGuests(true)}> Add Guests </button>
            }
            {
              addGuests &&
              <div className="addingMemInpField p-4 bg-light rounded-4 mt-3">
                <AddGuestsToMtngTblInpField
                  tableNumberId={mtngTbl.tbl_id}
                  tableNumber={mtngTbl.tbl_no}
                  tblSesnGuests={tblSesnGuests}
                  setTblSesnGuests={setTblSesnGuests}
                  allGuests={allGuests}
                  session={session}
                />
              </div>
            }
          </div>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;