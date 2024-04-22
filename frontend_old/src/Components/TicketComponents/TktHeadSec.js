import React from 'react';
import { convertTimeFormat } from '../../utils/convertTimeFormat';

export default function TktHeadSec({ tktInfo }) {
    return (
        <div className="d-flex-cb flex-fill">
            <div>
                <img src="/images/csuitelogo.png" alt="logo" className='img-fluid w-100px' />
            </div>
            <div>
                <p className="text mb-0 fw-bold small txtClrSecondary">
                    <span className="fw-bold">TKTID: </span>  {tktInfo.ticket_number}
                </p>
                <p className="xsmall fw-medium"> { convertTimeFormat(tktInfo.time) } </p>
            </div>
        </div>
    )
}