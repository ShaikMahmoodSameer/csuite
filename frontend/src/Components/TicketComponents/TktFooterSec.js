import React, { useEffect } from 'react';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';

const TktFooterSec = ({ tktInfo, rzpPmtId, setRzpPmtId }) => {

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/ticket/payment-details/${tktInfo.payment_id}`);
                // console.log(response.data);
                if (response && response.data.length > 0) {
                    const data = response.data[0];
                    setRzpPmtId(data.rzp_payment_id);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchPaymentDetails();
    }, [tktInfo.payment_id, setRzpPmtId]);    

    return (
        <div className='py-2'>
            {/* <p className="xsmall mb-0 text-muted fw-medium">
                <span>Reciept no: </span>
                <span>#ntcsrcpt0001 </span>
            </p> */}
            <p className="xsmall mb-0 text-muted fw-medium">
                <span>payment id: </span>
                <span> { rzpPmtId } </span>
            </p>
        </div>
    )
}

export default TktFooterSec
