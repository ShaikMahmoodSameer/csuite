import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchSeatingTables, addSeatingTable } from '../utils/seatingTableUtils';
import { addSeatingSofa, fetchSeatingSofas } from '../utils/seatingSofaUtils';
import SeatingTableBox from '../Components/SeatingTableComponents/SeatingTableBox';
import SeatingSofaBox from '../Components/SeatingTableComponents/SeatingSofaBox';
import SeatingTalbePopup from '../Components/Popups/SeatingTalbePopup';
import SeatingSofaPopup from '../Components/Popups/SeatingSofaPopup';

function Seatings() {
  const [seatingTables, setSeatingTables] = useState([]);
  const [seatingSofas, setSeatingSofas] = useState([]);
  const [SeatingTalbePopupShow, setSeatingTalbePopupShow] = useState(false);
  const [SeatingSofaPopupShow, setSeatingSofaPopupShow] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedSofa, setSelectedSofa] = useState(null);

  useEffect(() => { fetchSeatingTables(setSeatingTables); }, []);
  useEffect(() => { fetchSeatingSofas(setSeatingSofas); }, []);

  const handleAddTable = () => {
    const isConfirmed = window.confirm(`Confirm Adding new table "Table ${seatingTables.length + 1}" with 8 seats?`);
    if (!isConfirmed) {
      return;
    } else {
      addSeatingTable(seatingTables, setSeatingTables);
    }
  };

  const handleAddSofa = () => {
    const isConfirmed = window.confirm(`Confirm Adding new Sofa "Sofa ${seatingSofas.length + 1}"`);
    if (!isConfirmed) {
      return;
    } else {
      addSeatingSofa(seatingSofas, setSeatingSofas);
    }
  };

  // Group the seatingTables array into arrays of 2 and 3 tables alternately
  const groupedTables = [];
  for (let i = 0; i < seatingTables.length; i += 5) {
    groupedTables.push(seatingTables.slice(i, i + 2));
    if (i + 2 < seatingTables.length) {
      groupedTables.push(seatingTables.slice(i + 2, i + 5));
    }
  }

  return (
    <Wrapper>
      <div className="ScreenSec">
        <div className="box screenBox d-flex-cc w-100 bg-light rounded">
          <h2 className="text fw-medium mb-0"> ALL EYES WILL BE HERE </h2>
        </div>
      </div>

      <div className="seatingSofaBoxSec w-100 border-top border-bottom d-flex flex-wrap gap-2 justify-content-center pb-4">
        <p className="xsmall w-100"> Sofa - {seatingSofas.length} </p>
        {
          seatingSofas.map((sofa, idx) => (
              <SeatingSofaBox
                key={idx}
                sofa={sofa}
                setSeatingSofaPopupShow={setSeatingSofaPopupShow}
                setSelectedSofa={setSelectedSofa}
              />
          ))
        }
        <div className="AddTableBox w-100 d-flex-cc">
          <button className="btn btn-outline-dark" onClick={handleAddSofa}>
            Add Sofa <FontAwesomeIcon icon={faPlus} className='ms-4' />
          </button>
        </div>
      </div>

      <div className="seatingTablesBoxSec w-100 border-top border-bottom d-flex flex-wrap gap-3 justify-content-center pb-4">
        <p className="xsmall w-100"> Tables - {seatingTables.length} </p>
        {groupedTables.map((group, index) => (
          <div key={index} className="d-flex justify-content-center gap-3">
            {group.map((table, idx) => (
              <SeatingTableBox
                key={idx}
                table={table}
                setSeatingTalbePopupShow={setSeatingTalbePopupShow}
                setSelectedTable={setSelectedTable}
              />
            ))}
          </div>
        ))}
        <div className="AddTableBox w-100 d-flex-cc">
          <button className="btn btn-outline-dark" onClick={handleAddTable}>
            Add Table <FontAwesomeIcon icon={faPlus} className='ms-4' />
          </button>
        </div>
      </div>


      <SeatingTalbePopup show={SeatingTalbePopupShow} onHide={() => setSeatingTalbePopupShow(false)} table={selectedTable} />
      <SeatingSofaPopup show={SeatingSofaPopupShow} onHide={() => setSeatingSofaPopupShow(false)} sofa={selectedSofa} />
    </Wrapper>
  )
}

export default Seatings;

const Wrapper = styled.div`
.ScreenSec{
  .screenBox{
    height: 50px;
  }
}
`;