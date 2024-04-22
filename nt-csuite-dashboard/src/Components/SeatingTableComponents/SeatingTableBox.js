import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { fetchTableGuests } from '../../utils/fetchTableGuests';

function SeatingTableBox({ table, setSeatingTalbePopupShow, setSelectedTable }) {
    const [tableGuests, setTableGuests] = useState([]);

    useEffect(() => {
        fetchTableGuests(table.seating_table_id, setTableGuests)
    }, [table]);

    const handleClick = () => {
        setSelectedTable(table);
        setSeatingTalbePopupShow(true);
    }

    return (
        <Wrapper>
            <div className='seatingtTableBox bg-light rounded-4 p-4' onClick={handleClick}>
                <h2 className="text fw-bold text-center"> {table.seating_table_no} </h2>
                <div className="imgWrpr w-100 d-flex-cc">
                    <img className='tableImg' alt='tableImg' src={`/images/tables/table${tableGuests.length}.png`} />
                </div>
            </div>
        </Wrapper>
    )
}

export default SeatingTableBox;

const Wrapper = styled.div`
.seatingtTableBox{
    width: 180px;
    ${'' /* height: 200px; */}
    .tableImg{
      width: 120px;
    }
    &:hover{
      cursor: pointer;
    }
}
`