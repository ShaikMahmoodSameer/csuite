import axios from 'axios';
import BASE_URL from '../config/apiConfig';

export const fetchTableGuests = async (seatingTableId, setTableMembers) => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/seatings/table-guests/${seatingTableId}`);
        setTableMembers(response.data);
    } catch (error) { console.log(error); }
}