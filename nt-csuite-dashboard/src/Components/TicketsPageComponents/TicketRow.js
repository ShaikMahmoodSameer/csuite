import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faHandshake, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from '@mui/material';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import PersonalDetailsBox from './PersonalDetailsBox';
import BillingDetailsBox from './BillingDetailsBox';
import PaymentDetailsBox from './PaymentDetailsBox';
import UserSeatingBox from './UserSeatingBox';
import UserMeetingsBox from './UserMeetingsBox';

const TicketRow = ({ row, handleClick, isItemSelected, labelId }) => {
    const [tktData, setTktData] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchTktData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/ticket/ticketFullData/${row.ticket_id}`);
                setTktData(response.data[0]);
            } catch (error) { console.log(error); }
        };
        fetchTktData();
    }, [row]);

    const handleShowInfo = async () => {
        setOpen(!open);
    }

    return (
        <React.Fragment>
            {tktData && (
                <>
                    <TableRow
                        hover
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ '& > *': { borderBottom: 'unset' } }}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                role="checkbox"
                                onClick={(event) => handleClick(event, row.ticket_id)}

                            />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">{tktData.bnf_name}</TableCell>
                        <TableCell>{tktData.company}</TableCell>
                        <TableCell>{tktData.designation}</TableCell>
                        <TableCell>{tktData.ticket_number}</TableCell>
                        <TableCell className='d-flex gap-2'>
                            <button className="btn p-0 btn-outline-info btn-sm w-33" onClick={handleShowInfo}> <FontAwesomeIcon icon={faInfo} /> </button>
                            <button className="btn p-0 btn-outline-danger btn-sm w-33"> <FontAwesomeIcon icon={faHandshake} /> </button>
                            <button className="btn p-0 btn-outline-success btn-sm w-33"> <FontAwesomeIcon icon={faChair} /> </button>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                            <Collapse in={open} timeout="auto" unmountOnExit className='p-4'>
                                <Typography className='txtClrSecondary' variant="h6" gutterBottom component="h6"> {tktData.ticket_number} </Typography>
                                <div className="row">
                                    <div className="col-md-7">
                                        <Box>
                                            <PersonalDetailsBox tktData={tktData} />
                                            <BillingDetailsBox tktData={tktData} />
                                            <PaymentDetailsBox tktData={tktData} />
                                        </Box>
                                    </div>
                                    <div className="col-md-5">
                                        <Box>
                                            <UserSeatingBox ticket={row} />
                                            <UserMeetingsBox ticket={row} />
                                        </Box>
                                    </div>
                                </div>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </>
            )}
        </React.Fragment>
    )
}

export default TicketRow;




