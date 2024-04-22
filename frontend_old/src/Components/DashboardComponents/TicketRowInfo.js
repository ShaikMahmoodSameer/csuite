import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_API_URL from '../../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faInfo } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';

const TicketRowInfo = ({ item, setTicketInfoPopupShow }) => {
    const [beneficiary, setBeneficiary] = useState({
        name: '',
        email: '',
        tel: '',
        company: '',
        designation: '',
    });

    useEffect(() => {
        const fetchTktBnfDetails = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/ticket/bnf-details/${item.bnf_id}`);
                if (response && response.data.length > 0) {
                    const data = response.data[0];
                    setBeneficiary({
                        name: data.bnf_name,
                        email: data.email,
                        tel: data.mobile_number,
                        company: data.company,
                        designation: data.designation,
                    });
                } else {
                    console.log('No beneficiaries found');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchTktBnfDetails();
    }, [item, setBeneficiary]);

    return (
        <tr className='w-100'>
            <td> { item.ticket_id } </td>
            <td> { item.ticket_number } </td>
            <td> { beneficiary.name } </td>
            <td> { beneficiary.company } </td>
            <td> { beneficiary.designation } </td>
            <td className='d-flex gap-2'>
                <button className="btn btn-outline-info w-33" onClick={() => setTicketInfoPopupShow(true)}> <FontAwesomeIcon icon={faInfo} /> </button> 
                <button className="btn btn-outline-danger w-33"> <FontAwesomeIcon icon={faHandshake} /> </button> 
                <button className="btn btn-outline-success w-33"> <FontAwesomeIcon icon={faChair} /> </button> 
            </td>
        </tr>
    )
}

export default TicketRowInfo
