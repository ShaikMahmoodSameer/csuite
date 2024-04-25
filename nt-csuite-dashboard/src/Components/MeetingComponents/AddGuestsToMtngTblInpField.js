import React, { useState } from 'react';
import { styled } from "styled-components";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { addGuestsToMtngTblSess, fetchTblSessGuests } from '../../utils/meetingTableUtils';

function AddGuestsToMtngTblInpField({ tableNumberId, tableNumber, tblSesnGuests, setTblSesnGuests, allGuests, session }) {
    const [selectedGuests, setSelectedGuests] = useState([]);
    const [isAddingGuests, setIsAddingGuests] = useState(false);

    const handleGuestChange = (_, selectedOptions) => {
        setSelectedGuests(selectedOptions);
    };

    const handleSubmitGuests = () => {
        setIsAddingGuests(true);
        const newGData = {
            selectedGuests: selectedGuests, 
            tableNumberId : tableNumberId, 
            tableNumber : tableNumber, 
            session: session
        }
        
        addGuestsToMtngTblSess(newGData).then(status => {
            if (status === 200) {
                setSelectedGuests([]);
                fetchTblSessGuests({tblNo: tableNumber, session}, setTblSesnGuests);
            } else { console.log(status) }
            setIsAddingGuests(false);
        });
    };    

    const filteredGuests = allGuests.filter((option) => !selectedGuests.includes(option) && !tblSesnGuests.some((member) => member.bnf_name === option.bnf_name));
    
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

            <Button variant="contained" className='mt-3' onClick={handleSubmitGuests} disabled={isAddingGuests}>
                Add Guests to Meeting Table {tableNumber} ( {session} )
            </Button>
            <p className="xsmall"> Adds selected guests to the table and sends seating details to guests on WhatsApp... </p>
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
