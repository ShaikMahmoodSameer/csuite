import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';

const AddGuestsToSofaInpField = ({ fetchSofaGuests, sofaNumber, sofaId, sofaMaxSeats, sofaMembers, allGuests }) => {
    const [selectedGuests, setSelectedGuests] = useState([]);
    const [unseatedGuests, setUnseatedGuests] = useState([]);

    const fetchUnseatedGuests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/guests/get-unseated-guests`);
            setUnseatedGuests(response.data);
        } catch (error) { console.log(error); }
    }
    useEffect(() => { fetchUnseatedGuests() }, [])

    const handleGuestChange = (_, selectedOptions) => { setSelectedGuests(selectedOptions); };

    const handleSubmitGuests = () => {
        const addSelectedGuestsToSofa = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/admin/seatings/add-guests-to-sofa`, {
                    params: {
                        selectedGuests: selectedGuests,
                        sofaNumber: sofaNumber,
                        sofaId: sofaId
                    }
                });
                if (response.data.Status === "Success") {
                    fetchSofaGuests(sofaId);
                    fetchUnseatedGuests();
                    setSelectedGuests([])
                    // window.location.reload(); // Refresh the page
                }
            } catch (error) { console.log(error); }
        }
        addSelectedGuestsToSofa();
    };

    const filteredGuests = unseatedGuests.filter((option) => !selectedGuests.includes(option) && !sofaMembers.some((member) => member.bnf_name === option.bnf_name));

    return (
        <Wrapper>
            <Autocomplete
                multiple
                id='guestsSelector'
                options={filteredGuests}
                getOptionLabel={(option) => option.bnf_name}
                onChange={handleGuestChange}
                value={selectedGuests}
                disabled={sofaMembers.length + selectedGuests.length >= sofaMaxSeats}
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
                                <span className='px-3 my-2 bgClr2 rounded-pill text-white me-2'>T{sofaNumber}S{sofaMembers.length + index + 1}</span>
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
            <p className="xsmall"> Adds selected guests to sofa and sends Seating detaials to guest on whatsapp... </p>
        </Wrapper>
    );
};

export default AddGuestsToSofaInpField;

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