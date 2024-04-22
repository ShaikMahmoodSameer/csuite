import React, { useState } from 'react';
import Select from 'react-select';

const EmailSelector = () => {
    const emailOptions = [
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

    const [selectedEmails, setSelectedEmails] = useState([]);

    const handleEmailChange = (selectedOptions) => {
        setSelectedEmails(selectedOptions);
    };

    return (
        <Select
            isMulti
            options={emailOptions}
            onChange={handleEmailChange}
            value={selectedEmails}
            placeholder="Select email addresses..."
        />
    );
};

export default EmailSelector;
