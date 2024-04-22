import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import BASE_URL from "../config/apiConfig";
import axios from "axios";
import TktBnfSec from "./TicketComponents/TktBnfSec";
import TktHeadSec from "./TicketComponents/TktHeadSec";
import TktBillSec from "./TicketComponents/TktBillSec";
import TktFooterSec from "./TicketComponents/TktFooterSec";
import QRCode from "qrcode.react";
import { convertTimeFormat } from "../utils/convertTimeFormat";

export default React.forwardRef(function Ticket({ ticketId, setTicketId }, ref ) {
  const [tktInfo, setTktInfo] = useState({});
  const [qrCodeText, setQRCodeText] = useState("");

  const [beneficiary, setBeneficiary] = useState({ name: "", email: "", tel: "", company: "", designation: "" });

  const [billing, setBilling] = useState({
    tktSubtotalAmount: "",
    order_coupon_code: "",
    tktDiscountAmount: "",
    tktTotalAmount: "",
  });

  const [rzpPmtId, setRzpPmtId] = useState("");

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/ticket/${ticketId}`);
        if (response) {
          setTktInfo(response.data);
          setQRCodeText(
            `${tktInfo.ticket_number}, ${convertTimeFormat(tktInfo.time)}, ${beneficiary.name}, ${beneficiary.email}, ${beneficiary.tel}, ${beneficiary.company}, ${beneficiary.designation}, ${billing.tktSubtotalAmount}, ${billing.order_coupon_code}, ${billing.tktDiscountAmount}, ${billing.tktTotalAmount}, ${rzpPmtId}, Razorpay`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicketInfo();
  }, [setTktInfo, setQRCodeText, ticketId, beneficiary, billing, rzpPmtId, tktInfo]);

  return (
    <Wrapper ref={ref}>
      <div className="tktWrapper row gx-5 overflow-hidden">
        <div className="tktInfoSec col-md-6">
          <TktHeadSec className="tktID" tktInfo={tktInfo} />
          <div className="brdrBtmDtd">
            <TktBnfSec tktInfo={tktInfo} beneficiary={beneficiary} setBeneficiary={setBeneficiary} />
            <TktBillSec tktInfo={tktInfo} billing={billing} setBilling={setBilling} />
          </div>
          <TktFooterSec tktInfo={tktInfo} rzpPmtId={rzpPmtId} setRzpPmtId={setRzpPmtId} />
        </div>

        <div className="tktQrSec col-md-6">
          {qrCodeText && (
            <div className="w-100">
              <QRCode value={qrCodeText} renderAs="svg" level="L" bgColor="transparent" fgColor="url(#gradient)" size={300} />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%" >
                    <stop offset="0%" style={{ stopColor: "var(--clr2)", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "var(--clr1)", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .tktWrapper {
    .tktInfoSec {
      text-align: start;
      .vr {
        height: 75%;
        border: 2px solid red;
      }
    }
    .tktInfoSec {
      width: 50%;
    }
    .left {
      .rbd {
        /* border: 2px solid red; */
        span {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
    .right {
      .share {
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 10px;
      }
    }
  }
  .brdrBtmDtd{
    border-bottom: 2px dotted #adadad;
  }
  /* For responsiveness mobile */
  @media only screen and (max-width: 600px) {
    .tktWrapper {
      .tktQrSec {
        width: 100%;
        svg{
          border: 2px solid red;
          width: 100% !important;
          height: auto !important;
        }
      }
      .tktInfoSec {
        width: 100%;
      }
    }
  }
  /*  */
`;
