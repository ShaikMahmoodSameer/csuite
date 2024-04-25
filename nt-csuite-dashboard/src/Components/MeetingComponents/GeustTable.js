import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { styled } from 'styled-components';

function GeustTable({ tblSesnGuests }) {
    return (
        <Wrapper>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <TableBody>
                        {
                            tblSesnGuests.map((guest, idx) => (
                                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" className='d-flex align-items-center'>
                                        <div className="profileIcon d-flex-cc me-2">
                                            <img src="/images/tables/Profile.svg" alt="ProfileSvg" className='img-fluid' />
                                        </div>
                                        {guest.bnf_name}
                                    </TableCell>
                                    <TableCell align="left"> {guest.designation} </TableCell>
                                    <TableCell align="left"> {guest.company} </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Wrapper>
    )
}

export default GeustTable;

const Wrapper = styled.div`
.profileIcon{
  width: 25px;
  height: 25px;
  border: 1px solid var(--clr2);
  border-radius: 25px;
}
`
