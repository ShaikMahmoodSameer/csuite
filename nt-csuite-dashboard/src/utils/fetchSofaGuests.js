import axios from 'axios';
import BASE_URL from '../config/apiConfig';

export const fetchSofaGuests = async (seatingSofaId, setSofaMembers) => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/seatings/sofa-guests/${seatingSofaId}`);
        setSofaMembers(response.data);
    } catch (error) { console.log(error); }
}