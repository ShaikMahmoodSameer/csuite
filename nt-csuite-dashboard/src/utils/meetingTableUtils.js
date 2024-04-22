import axios from 'axios';
import BASE_URL from '../config/apiConfig';

export const fetchMeetingTables = async (setMeetingTables) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/meetings/get-meeting-tables`);
    setMeetingTables(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const addMtngTable = async (meetingTables, setMeetingTables) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/meetings/add-meeting-table`, {
      tableName: `Meeting Table ${meetingTables.length + 1}`,
      tableNo: meetingTables.length + 1,
      roomNo: 1
    });
    if (response.data.Status === 'Success') {
      fetchMeetingTables(setMeetingTables);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchTableGuests = async (mtngTblId, setTblGuests) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/meeting/table-guests/${mtngTblId}`);
    setTblGuests(response.data);
  } catch (error) { console.log(error); }
}