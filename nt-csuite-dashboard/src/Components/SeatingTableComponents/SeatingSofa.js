import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { styled } from 'styled-components';
import AddGuestsToSofaInpField from './AddGuestsToSofaInpField';

function SeatingSofa({ sofa }) {
    const [allGuests, setAllGuests] = useState([]);
    const [sofaMembers, setSofaMembers] = useState([]);

    useEffect(() => {
        const fetchAllGuests = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/guests`);
                setAllGuests(response.data);
            } catch (error) { console.log(error); }
        }
        fetchAllGuests()
    }, [])

    const fetchSofaGuests = async (seatingSofaId) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/seatings/sofa-guests/${seatingSofaId}`);
            setSofaMembers(response.data);
        } catch (error) { console.log(error); }
    }
    useEffect(() => { fetchSofaGuests(sofa.seating_sofa_id) }, [sofa])

    return (
        <Wrapper>
            <div className={`Sofa${sofa.sofa_no}Wrapper SofaBox w-100`}>
                <div className='SofaBoxImgWrpr me-4 overflow-hidden'>
                    <img className='sofaImg w-100' alt='SofaImg' src={`/images/tables/sofa${sofaMembers.length}.png`} />
                </div>
                <div className='flex-fill'>
                    <p className="text w-100 d-flex-cb">
                        <span className='fw-bold'> {sofa.seating_sofa_no} </span>
                        <span className='small'> {sofaMembers.length}/{sofa.no_of_seats} Guests </span>
                    </p>

                    <div className="addedMemSecWrpr py-2 shadow- rounded-3 bg-white">
                        {
                            sofaMembers.map((member, index) => (
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
                            sofaMembers.length < sofa.no_of_seats ?
                                <div className="addingMemInpField p-4">
                                    <AddGuestsToSofaInpField fetchSofaGuests={fetchSofaGuests} sofaMaxSeats={sofa.no_of_seats} sofaNumber={sofa.sofa_no} sofaId={sofa.seating_sofa_id} sofaMembers={sofaMembers} allGuests={allGuests} />
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

export default SeatingSofa;

const Wrapper = styled.div`
.SofaBox{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 25px;
    margin: 8px 0;
    border-radius: 15px;
    background: #f7f7f7;
    .SofaBoxImgWrpr{
      width: 200px !important;
      img.SofaImg{
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
