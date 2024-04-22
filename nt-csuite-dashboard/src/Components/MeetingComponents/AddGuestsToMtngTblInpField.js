import React, { useState } from 'react';
import { styled } from "styled-components";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';

function AddGuestsToMtngTblInpField({ fetchTableGuests, tableNumber, tblGuests, setTblGuests, allGuests, session }) {
    const [selectedGuests, setSelectedGuests] = useState([]);
    // const [unseatedGuests, setUnseatedGuests] = useState([]);

    // useEffect(() => { fetchUnseatedGuests(setUnseatedGuests) }, [])

    const handleGuestChange = (_, selectedOptions) => {
        setSelectedGuests(selectedOptions);
    };

    const handleSubmitGuests = () => {
        const addSelectedGuestsToTable = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/admin/meetings/add-guests-to-table`, {
                    params: {
                        selectedGuests: selectedGuests,
                        tableNumber: tableNumber,
                        session: session
                    }
                });
                if (response.data.Status === "Success") {
                    fetchTableGuests(tableNumber, setTblGuests);
                    setTblGuests([]);
                }
            } catch (error) { console.log(error); }
        }
        addSelectedGuestsToTable();
    };

    const filteredGuests = allGuests.filter((option) => !selectedGuests.includes(option) && !tblGuests.some((member) => member.bnf_name === option.bnf_name));
    
    return (
        <Wrapper>
            <Autocomplete
                multiple
                id='guestsSelector'
                options={filteredGuests}
                getOptionLabel={(option) => option.bnf_name}
                onChange={handleGuestChange}
                value={selectedGuests}
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
                                <span className='px-3 py-0 my-2 bgClr2 rounded-pill text-white me-2'> {guest.bnf_name} </span>
                                <span className="small"> {guest.company} {guest.designation} </span>
                            </p>
                        }
                        onDelete={() => { setSelectedGuests(selectedGuests.filter((e) => e !== guest)); }}
                    />
                ))}
            </div>

            <Button variant="contained" className='mt-3' onClick={handleSubmitGuests}>
                Add Guests to Meeting Table {tableNumber} ( {session} )
            </Button>
            <p className="xsmall"> Adds selected guests to the table and sends seating detaials to guest on whatsapp... </p>
        </Wrapper>
    );
}

export default AddGuestsToMtngTblInpField;

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