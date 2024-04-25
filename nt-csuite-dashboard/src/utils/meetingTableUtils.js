import axios from 'axios';
import BASE_URL from '../config/apiConfig';

export const fetchMtngTbls = async (setMeetingTables) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/meetings/get-meeting-tables`);
    setMeetingTables(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const addMtngTbl = async (meetingTables, setMeetingTables) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/meetings/add-meeting-table`, {
      tableName : `Meeting Table ${meetingTables.length + 1}`,
      tableNo : meetingTables.length + 1,
      roomNo : 1 
    });
    if(response.data.Status === "Success"){
      fetchMtngTbls(setMeetingTables)
    }
  } catch (error) { console.log(error) }
};

export const fetchTblSessGuests = async ({ tblNo, session }, setTblSesnGuests) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/meetings/table-session-guests?tblNo=${tblNo}&session=${session}`);
    setTblSesnGuests(response.data);
  } catch (error) { console.log(error) }
}

export const addGuestsToMtngTblSess = async (newGData) => {
  try {
      const response = await axios.post(`${BASE_URL}/admin/meetings/add-guests-to-table`, {
        selectedGuests: newGData.selectedGuests,
        tableNumberId: newGData.tableNumberId,
        tableNumber: newGData.tableNumber,
        session: newGData.session
      });
      return response.status;
  } catch (error) { return error.response.status; }
}