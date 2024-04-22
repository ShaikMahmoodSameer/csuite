import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import Box from '@mui/material/Box';
import { fetchTableGuests } from '../../utils/meetingTableUtils';
import AddGuestsToMtngTblInpField from './AddGuestsToMtngTblInpField';

function TabPanel(props) {
  const { children, value, index, mtngTbl, ...other } = props;

  const [allGuests, setAllGuests] = useState([]);
  const [tblGuests, setTblGuests] = useState([]);
  const [addGuests, setAddGuests] = useState(false)

  useEffect(() => {
    const fetchAllGuests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/guests`);
        setAllGuests(response.data);
      } catch (error) { console.log(error); }
    }
    fetchAllGuests()
  }, []);

  useEffect(() => {console.log(tblGuests);}, [tblGuests])

  useEffect(() => { fetchTableGuests(mtngTbl.tbl_id, setTblGuests) }, [mtngTbl])

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p className="small text"> Session Guests - {tblGuests.length} </p>
          <div className="addedMemSecWrpr py-2 shadow- rounded-3 bg-white">
            {
              tblGuests.map((guest, index) => (
                <div key={index} className='addedMemSec d-flex px-3 py-2'>
                  <div className='w-80 d-flex-cb pe-3'>
                    <div className="d-flex align-items-center">
                      <div className="profileIcon d-flex-cc me-2">
                        <img src="/images/tables/Profile.svg" alt="ProfileSvg" className='img-fluid' />
                      </div>
                      <p className="memDtlsSec d-flex-cb mb-0 fw-bold"> {guest.bnf_name} </p>
                    </div>
                    <div>
                      <p className="small mb-0"> {guest.designation} <span> - {guest.company} </span> </p>
                    </div>
                  </div>
                </div>
              ))
            }

            <button className="btn btn-outline-secondary" onClick={() => setAddGuests(true)}> Add Guests </button>
            {
              addGuests && 
                <div className="addingMemInpField p-4 bg-light rounded-4 mt-5">
                  <AddGuestsToMtngTblInpField 
                    fetchTableGuests={fetchTableGuests} 
                    tableNumber={mtngTbl.tbl_id} 
                    tblGuests={tblGuests}
                    setTblGuests={setTblGuests}
                    allGuests={allGuests}
                    session={children}
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