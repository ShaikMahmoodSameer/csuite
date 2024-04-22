import Table from 'react-bootstrap/Table';
import TicketRowInfo from './TicketRowInfo';

function TicketsListTable({ ticketsData, setTicketInfoPopupShow }) {
    return (
        <Table striped>
            <thead className='table-light'>
                <tr>
                    <th>#Id</th>
                    <th>Ticket Number</th>
                    <th>User Name</th>
                    <th>Company</th>
                    <th>Designation</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    ticketsData && ticketsData.map((item, index) => (
                        <TicketRowInfo 
                            key={index} 
                            item={item} 
                            setTicketInfoPopupShow={setTicketInfoPopupShow}    
                            />
                    ))
                }
            </tbody>
        </Table>
    );
}

export default TicketsListTable;