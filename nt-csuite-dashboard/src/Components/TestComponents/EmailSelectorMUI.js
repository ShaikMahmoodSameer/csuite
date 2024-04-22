import React, { useState } from 'react';
import { styled } from "styled-components";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const EmailSelectorMui = () => {
    const initialEmailOptions = [
        { value: 'john.doe@example.com', label: 'John Doe' },
        { value: 'jane.smith@example.com', label: 'Jane Smith' },
        { value: 'alice.johnson@example.com', label: 'Alice Johnson' },
        { value: 'bob.white@example.com', label: 'Bob White' },
        { value: 'emma.davis@example.com', label: 'Emma Davis' },
        { value: 'sam.wilson@example.com', label: 'Sam Wilson' },
        { value: 'lisa.brown@example.com', label: 'Lisa Brown' },
        { value: 'mike.jones@example.com', label: 'Mike Jones' },
        { value: 'sara.wilson@example.com', label: 'Sara Wilson' },
        { value: 'alex.smith@example.com', label: 'Alex Smith' },
    ];

    const [emailOptions] = useState(initialEmailOptions);
    const [selectedEmails, setSelectedEmails] = useState([]);

    const handleEmailChange = (_, selectedOptions) => {
        setSelectedEmails(selectedOptions);
    };

    const filteredOptions = emailOptions.filter((option) => !selectedEmails.includes(option));

    const handleSubmitGuests = () => {
        console.log(selectedEmails);
    }

    return (
        <Wrapper>
            <Autocomplete
                multiple
                id="email-selector"
                options={filteredOptions}
                getOptionLabel={(option) => option.label }
                onChange={handleEmailChange}
                value={selectedEmails}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Select email addresses..."
                        placeholder="Emails"
                    />
                )}
            />
            <div style={{ marginTop: 10 }}>
                {selectedEmails.map((email, index) => (
                    <Chip
                        key={index}
                        label={
                            <p className='mb-0'>
                                <span className='px-3 my-2 bgClr2 rounded-pill text-white me-2'>T1S1</span>
                                <span> {email.label} </span>
                            </p>
                        }
                        onDelete={() => { setSelectedEmails(selectedEmails.filter((e) => e !== email)); }}
                    />
                ))}
            </div>
            <Button variant="contained" onClick={handleSubmitGuests}>
                Add Members
            </Button>
        </Wrapper>
    );
};

export default EmailSelectorMui;

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
