import React from 'react'

const PersonalDetailsBox = ({ tktData }) => {
    return (
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
    )
}

export default PersonalDetailsBox