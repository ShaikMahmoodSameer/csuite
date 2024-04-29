import React from 'react'

const PaymentDetailsBox = ({ tktData }) => {
    return (
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
    )
}

export default PaymentDetailsBox