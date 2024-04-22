import React from "react";
import { styled } from "styled-components";
import Ticket from "./Ticket";
import { useReactToPrint } from "react-to-print";

export default function Step4({ ticketId, setTicketId }) {
  const componentRef = React.useRef();
  const InitiatePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    console.log("function called!");
    InitiatePrint();
  }

  return (
    <Wrapper>
      <h2 className="stepHeading tufr text-center textAccent txtClrPrimary">
        Thank Your for Registering!
      </h2>

      <Ticket ticketId={ticketId} setTicketId={setTicketId} ref={componentRef} />

      <div className="dowTkt mt-3">
        <button className="w-100" onClick={handlePrint}> Download Ticket </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .tufr {
    font-size: 30px;
    background: linear-gradient( 290deg, rgb(247, 4, 234), rgb(211, 65, 151), rgba(248, 100, 5), rgba(178, 29, 247));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hyt {
    color: var(--text);
  }
  .dowTkt {
      display: flex;
      button {
        border: none;
        margin: 10px auto;
        padding: 8px 32px;
        font-size: 14px;
        color: white;
        background: linear-gradient(
          290deg,
          rgb(255, 154, 3),
          rgba(248, 100, 5),
          rgba(178, 29, 247)
        );
        &:hover {
          transition: 0.5s;
          background: linear-gradient(
            220deg,
            rgba(178, 29, 247),
            rgba(248, 100, 5),
            rgb(255, 154, 3)
          );
        }
      }
    }
`;
