import React from 'react';
import { styled } from 'styled-components';

function MtngTblBox({ mtngTbl, setMeetingRoomPopupShow, setSelectedMeetinTable }) {

    const handleClick = () => {
        setSelectedMeetinTable(mtngTbl);
        setMeetingRoomPopupShow(true);
    }

    return (
        <Wrapper>
            <div className="MtngTblBox bg-light rounded-4 p-4 d-flex-cc" onClick={handleClick}>
                <h2 className="text fw-bold"> {mtngTbl.tbl_name} </h2>
            </div>
        </Wrapper>
    )
}

export default MtngTblBox;

const Wrapper = styled.div`
.MtngTblBox{
    width: 220px;
    &:hover{
      cursor: pointer;
    }
}
`