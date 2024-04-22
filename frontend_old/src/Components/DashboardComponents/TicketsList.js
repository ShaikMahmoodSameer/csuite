import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import TicketsListTable from './TicketsListTable';

export default function TicketsList({ setTicketInfoPopupShow }) {
    const [ticketsData, setTicketsData] = useState([])

    useEffect(() => {
        const fetchAllTickets = async () => {
            try{
                const response = await axios.get(`${BASE_URL}/ticket`);
                setTicketsData(response.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchAllTickets();
    }, [setTicketsData])

    return (
        <Wrapper>
            <h2 className="text-k-secondary">Tickets</h2>
            <p className="small"> {ticketsData && ticketsData.length} Tickets found</p>
            
            { 
                ticketsData && ticketsData.length > 0 ? 
                    <TicketsListTable 
                        ticketsData={ticketsData} 
                        setTicketInfoPopupShow={setTicketInfoPopupShow} /> 
                    : 
                    "No tickets found" 
            }

        </Wrapper>
    )
}

const Wrapper = styled.div``
