import React, { useEffect, useState } from 'react'
import AddingMemInpField from './AddingMemInpField';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { styled } from 'styled-components';

function SeatingTable({ item, index }) {
    const [allGuests, setAllGuests] = useState([]);
    const [tableMembers, setTableMembers] = useState([]);

    useEffect(() => {
        const fetchAllGuests = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/guests`);
                setAllGuests(response.data);
            } catch (error) { console.log(error); }
        }
        fetchAllGuests()
    }, [])

    const fetchTableGuests = async (seatingTableId) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/seatings/table-guests/${seatingTableId}`);
            setTableMembers(response.data);
        } catch (error) { console.log(error); }
    }

    useEffect(() => { fetchTableGuests(item.seating_table_id) }, [item])

    return (
        <Wrapper>
            <div className={`Table${index}Wrapper TableBox w-100`}>
                <div className='TableBoxImgWrpr overflow-hidden me-4'>
                    <img className='tableImg w-100' alt='tableImg' src={`/images/tables/table${tableMembers.length}.png`} />
                </div>
                <div className='flex-fill'>
                    <p className="text w-100 d-flex-cb">
                        <span className='fw-bold'> {item.seating_table_no} </span>
                        <span className='small'> {tableMembers.length}/{item.no_of_seats} Guests </span>
                    </p>

                    <div className="addedMemSecWrpr py-2 shadow- rounded-3 bg-white">
                        {
                            tableMembers.map((member, index) => (
                                <div key={index} className='addedMemSec d-flex px-3 py-2'>
                                    <div className='w-80 d-flex-cb pe-3'>
                                        <div className="d-flex align-items-center">
                                            <div className="profileIcon d-flex-cc me-2">
                                                <img src="/images/tables/Profile.svg" alt="ProfileSvg" className='img-fluid' />
                                            </div>
                                            <p className="memDtlsSec d-flex-cb mb-0 fw-bold"> {member.bnf_name} </p>
                                        </div>
                                        <div>
                                            <p className="small mb-0"> {member.designation} <span> - {member.company} </span> </p>
                                        </div>
                                    </div>

                                    <div className='w-20 border-start d-flex-cc'>
                                        <p className="text txtClrSecondary mb-0 memTblStSec fw-bold"> {member.seat} </p>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            tableMembers.length < item.no_of_seats ?
                                <div className="addingMemInpField p-4">
                                    <AddingMemInpField fetchTableGuests={fetchTableGuests} tableMaxSeats={item.no_of_seats} tableNumber={item.seating_table_id} tableNo={item.table_no} tableMembers={tableMembers} allGuests={allGuests} />
                                </div>
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default SeatingTable;

const Wrapper = styled.div`
.TableBox{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 25px;
    margin: 8px 0;
    border-radius: 15px;
    background: #f7f7f7;
    .TableBoxImgWrpr{
      width: 200px !important;
      img.tableImg{
        width: 100%;
      } 
    }
  }
.addedMemSecWrpr{
  .addedMemSec{
    .profileIcon{
      width: 25px;
      height: 25px;
      border: 1px solid var(--clr2);
      border-radius: 25px;
    }
  }
}
`
