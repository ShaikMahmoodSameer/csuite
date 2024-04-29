import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';

const AddingMemInpField = ({ fetchTableGuests, tableNumber, tableNo, tableMaxSeats, tableMembers, allGuests }) => {
    const [selectedGuests, setSelectedGuests] = useState([]);
    const [unseatedGuests, setUnseatedGuests ] = useState([]);

    const fetchUnseatedGuests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/guests/get-unseated-guests`);
            setUnseatedGuests(response.data);
        } catch (error) { console.log(error); }
    }
    useEffect(() => { fetchUnseatedGuests() }, [])
    
    const handleGuestChange = (_, selectedOptions) => {
        setSelectedGuests(selectedOptions);
    };

    const handleSubmitGuests = () => {
        const addSelectedGuestsToTable = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/admin/seatings/add-guests-to-table`, { params: {
                    selectedGuests: selectedGuests,
                    tableNumber: tableNumber,
                    tableNo: tableNo
                }});
                if(response.data.Status === "Success"){
                    fetchTableGuests(tableNumber);
                    fetchUnseatedGuests();
                    setSelectedGuests([]);
                    // window.location.reload();
                }
            } catch (error) { console.log(error); }
        }
        addSelectedGuestsToTable();
    };

    const filteredGuests = unseatedGuests.filter((option) => !selectedGuests.includes(option) && !tableMembers.some((member) => member.bnf_name === option.bnf_name));
    
    return (
        <Wrapper>
            <Autocomplete
                multiple
                id='guestsSelector'
                options={filteredGuests}
                getOptionLabel={(option) => option.bnf_name}
                onChange={handleGuestChange}
                value={selectedGuests}
                disabled={ tableMembers.length + selectedGuests.length >= tableMaxSeats }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Add Members"
                        placeholder="Type a name"
                    />
                )}
            />

            <div style={{ marginTop: 20 }}>
                {selectedGuests.map((guest, index) => (
                    <Chip
                        key={index}
                        label={
                            <p className='mb-0'>
                                <span className='px-3 my-2 bgClr2 rounded-pill text-white me-2'>T{tableNumber}S{tableMembers.length + index + 1}</span>
                                <span className="fw-bold"> {guest.bnf_name} </span>
                                <span className="small"> {guest.company} {guest.designation} </span>
                            </p>
                        }
                        onDelete={() => { setSelectedGuests(selectedGuests.filter((e) => e !== guest)); }}
                    />
                ))}
            </div>

            <Button variant="contained" onClick={handleSubmitGuests}>
                Add Members
            </Button>
            <p className="xsmall"> Adds selected guests to the table and sends seating detaials to guest on whatsapp... </p>
        </Wrapper>
    );
};

export default AddingMemInpField;

const Wrapper = styled.div`
.MuiChip-root{
    margin: 5px !important;
    padding: 5px;
    .MuiChip-label{
        padding: 0;
        padding-right: 15px;
    }
}
`