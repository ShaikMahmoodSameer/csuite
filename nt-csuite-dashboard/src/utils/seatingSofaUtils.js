import axios from 'axios';
import BASE_URL from '../config/apiConfig';

export const fetchSeatingSofas = async (setSeatingSofas) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/seatings/get-seating-sofas`);
    setSeatingSofas(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const addSeatingSofa = async (seatingSofas, setSeatingSofas) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/seatings/add-seating-sofa`, {
      sofaNumber: `Sofa ${seatingSofas.length + 1}`,
      sofa_no: seatingSofas.length + 1,
      noOfSeats: 2,
    });
    if (response.data.Status === 'Success') {
      fetchSeatingSofas(setSeatingSofas);
    }
  } catch (error) {
    console.log(error);
  }
};