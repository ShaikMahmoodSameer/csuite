import React from 'react'

const BillingDetailsBox = ({ tktData }) => {
    return (
        <div className="shadow-sm rounded-3 my-2">
            <p className="textAccent fw-medium p-3 bg-light"> Billing Details: </p>
            <div className="p-3">
                {
                    [
                        { label: "Order Time", val: tktData.order_time },
                        { label: "Subtotal Amount", val: tktData.order_subtotal_amount },
                        { label: "Order Coupon Code Applied", val: tktData.order_coupon_code_applied },
                        { label: "Order Coupon Code Discount", val: tktData.order_coupon_code_discount },
                        { label: "Order Total Amount", val: tktData.order_total_amount }
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

export default BillingDetailsBox