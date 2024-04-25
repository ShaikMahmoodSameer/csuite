import axios from 'axios';
import BASE_URL from '../config/apiConfig';

export const fetchAllGuests = async (setAllGuests) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/guests`);
    setAllGuests(response.data);
  } catch (error) { console.log(error); }
}

export const fetchUnseatedGuests = async (setUnseatedGuests) => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/guests/get-unseated-guests`);
        setUnseatedGuests(response.data);
    } catch (error) { console.log(error); }
}