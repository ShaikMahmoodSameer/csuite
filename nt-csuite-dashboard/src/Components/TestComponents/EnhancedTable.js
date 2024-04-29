import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faHandshake, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from '@mui/material';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) { return -1; }
    if (b[orderBy] > a[orderBy]) { return 1; }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        label: 'User Name',
        id: 'user_name',
        numeric: false,
        disablePadding: true,
    },
    {
        label: 'Company',
        id: 'company',
        numeric: false,
        disablePadding: false,
    },
    {
        label: 'Designation',
        id: 'designation',
        numeric: false,
        disablePadding: false,
    },
    {
        label: 'Ticket No',
        id: 'ticket_no',
        numeric: false,
        disablePadding: false,
    },
    {
        label: 'Action',
        id: 'action',
        numeric: false,
        disablePadding: false,
    },
];

function TicketsTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className='bg-light'>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

TicketsTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function TicketsTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Tickets
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

TicketsTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function TicketsTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [ticketsData, setTicketsData] = React.useState([])
    React.useEffect(() => {
        const fetchAllTickets = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/ticket`);
                setTicketsData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllTickets();
    }, [setTicketsData])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = ticketsData.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ticketsData.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(ticketsData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, ticketsData],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TicketsTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <TicketsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={ticketsData.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.ticket_id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TicketRow
                                        key={index}
                                        row={row}
                                        handleClick={handleClick}
                                        isItemSelected={isItemSelected}
                                        labelId={labelId}
                                    />
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={ticketsData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}

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
                        sx={{ cursor: 'pointer', '& > *': { borderBottom: 'unset' } }}
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

                    <TableRow style={{ border: "0px" }}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                            <Collapse in={open} timeout="auto" unmountOnExit className='p-4'>
                                <Typography className='txtClrSecondary' variant="h6" gutterBottom component="h6"> {tktData.ticket_number} </Typography>
                                <div className="row">
                                    <div className="col-md-7">
                                        <Box>
                                            <div className="shadow-sm rounded-3 mb-2">
                                                <p className="textAccent fw-medium p-3 bg-light"> Personal Details: </p>
                                                <div className="p-3">
                                                    {
                                                        [
                                                            { label: "Name", val: tktData.bnf_name },
                                                            { label: "Company", val: tktData.company },
                                                            { label: "Designation", val: tktData.designation },
                                                            { label: "Email", val: tktData.email },
                                                            { label: "Mobile Number", val: tktData.mobile_number },
                                                            { label: "Purpose", val: tktData.purpose }
                                                        ].map((item, idx) => (
                                                            <p key={idx}    >
                                                                <span className='fw-medium'> {item.label} : </span>
                                                                <span className="">{item.val}</span>
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="shadow-sm rounded-3 my-2">
                                                <p className="textAccent fw-medium p-3 bg-light"> Billing Details: </p>
                                                <div className="p-3">
                                                    {
                                                        [
                                                            { label: "Order Time", val: tktData.order_time },
                                                            { label: "Subtotal Amount", val: tktData.order_subtotal_amount },
                                                            { label: "Order Coupon Code Applied", val: tktData.order_coupon_code_applied },
                                                            { label: "Order Coupon Code Discount", val: tktData.order_coupon_code_discount },
                                                            { label: "Order Total Amount", val: tktData.order_total_amount }
                                                        ].map((item, idx) => (
                                                            <p key={idx}>
                                                                <span className='fw-medium'> {item.label} : </span>
                                                                <span className="">{item.val}</span>
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="shadow-sm rounded-3 my-2">
                                                <p className="textAccent fw-medium p-3 bg-light"> Payment Details: </p>
                                                <div className="p-3 overflow-hidden">
                                                    {
                                                        [
                                                            { label: "RZP Order ID", val: tktData.rzp_order_id },
                                                            { label: "RZP Payment ID", val: tktData.rzp_payment_id },
                                                            { label: "RZP Signature", val: tktData.rzp_signature }
                                                        ].map((item, idx) => (
                                                            <p key={idx}>
                                                                <span className='fw-medium'> {item.label} : </span>
                                                                <span className="">{item.val}</span>
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </Box>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="shadow-sm rounded-3 mb-2">
                                            <p className="textAccent fw-medium p-3 bg-light d-flex-cb"> <span> Seating Details: </span> <span className='fw-bold txtClrSecondary'> ST1S2 </span> </p>
                                            <div className="p-3 overflow-hidden">
                                                <p>  </p>
                                                <p> Table No: 1 </p>
                                                <p> Seat No: 2 </p>
                                            </div>
                                        </div>
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