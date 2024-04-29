import axios from 'axios';
import BASE_URL from '../config/apiConfig';

export const fetchSeatingTables = async (setSeatingTables) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/seatings/get-seating-tables`);
    setSeatingTables(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const addSeatingTable = async (seatingTables, setSeatingTables) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/seatings/add-seating-table`, {
      tableNumber: `Table ${seatingTables.length + 1}`,
      tableNo: seatingTables.length + 1,
      noOfSeats: 8,
    });
    if (response.data.Status === 'Success') {
      fetchSeatingTables(setSeatingTables);
    }
  } catch (error) {
    console.log(error);
  }
};