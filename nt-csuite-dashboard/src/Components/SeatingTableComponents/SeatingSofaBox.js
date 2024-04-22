import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { fetchSofaGuests } from '../../utils/fetchSofaGuests';

function SeatingSofaBox({ sofa, setSeatingSofaPopupShow, setSelectedSofa }) {
    const [sofaGuests, setSofaGuests] = useState([]);

    useEffect(() => { fetchSofaGuests(sofa.seating_sofa_id, setSofaGuests) }, [sofa]);

    const handleClick = () => {
        setSelectedSofa(sofa);
        setSeatingSofaPopupShow(true);
    }

    return (
        <Wrapper className='w-20'>
            <div className='seatingtSofaBox bg-light rounded-4 p-4' onClick={handleClick}>
                <h2 className="text fw-bold text-center"> {sofa.seating_sofa_no} </h2>
                <div className="imgWrpr w-100 d-flex-cc">
                    <img className='sofaImg' alt='SofaImg' src={`/images/tables/sofa${sofaGuests.length}.png`} />
                </div>
            </div>
        </Wrapper>
    )
}


export default SeatingSofaBox;

const Wrapper = styled.div`
.seatingtSofaBox{
    .sofaImg{
      width: 100px;
    }
    &:hover{
      cursor: pointer;
    }
}
`