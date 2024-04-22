import React from 'react';
import { styled } from 'styled-components';
import MeetingSessionsTabs from './MeetingSessionsTabs';

function MeetingTbl({ mtngTbl }) {
  return (
    <Wrapper className='p-4'>
        <h2 className="txtSecondary"> { mtngTbl.tbl_name } </h2>
        <MeetingSessionsTabs mtngTbl={mtngTbl} />
    </Wrapper>
  )
}

export default MeetingTbl;

const Wrapper = styled.div``