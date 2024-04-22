import React from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableComponent from './PrintableComponent';

const DownloadPDFButton = () => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Download PDF</button>
      <div style={{ display: 'none' }}>
        <PrintableComponent ref={componentRef} />
      </div>
    </div>
  );
};

export default DownloadPDFButton;
