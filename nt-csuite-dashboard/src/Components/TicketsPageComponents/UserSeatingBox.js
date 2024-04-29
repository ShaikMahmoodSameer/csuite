import axios from 'axios';
import React, { useState } from 'react';
import BASE_URL from '../../config/apiConfig';

const UserSeatingBox = ({ ticket, tktData }) => {
    const [seating, setSeating] = useState(null);

    React.useEffect(() => {
        const fetchTktSeating = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/seatings/get-seating-by-guestid/${ticket.bnf_id}`);
                setSeating(response.data[0]);
            } catch (error) { console.log(error); }
        };
        fetchTktSeating();
    }, [ticket]);

    return (
        <div className="shadow-sm rounded-3 mb-2">
            <p className="textAccent fw-medium p-3 bg-light d-flex-cb">
                <span> Seating Details: </span>
                <span className='fw-bold txtClrSecondary'> {seating ? seating.seat : " - "} </span>
            </p>
            <div className="p-3 overflow-hidden">
                {seating ? (
                    <>
                        <p> {seating.seating_type === "table" ? `Table No: ${seating.table_no}` : `Sofa No: ${seating.sofa_no}`} </p>
                        <p> Seat No: {seating.seat_no} </p>
                    </>
                ) : <p className='text-danger'> Seat has not assigned! </p> }
            </div>
        </div>
    )
}
export default UserSeatingBox