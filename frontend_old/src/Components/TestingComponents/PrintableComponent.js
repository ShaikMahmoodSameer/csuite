import React from 'react';

const PrintableComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <h1>Printable Component</h1>
      <p>This is a printable component with some text and an image.</p>
      <img src="/images/csuitelogo.png" alt="Example" />
    </div>
  );
});

export default PrintableComponent;
