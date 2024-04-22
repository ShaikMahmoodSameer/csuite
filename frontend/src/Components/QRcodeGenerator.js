import React, { useState } from "react";
import QRCode from "qrcode.react";

function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrCodeText, setQRCodeText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQRCodeText(text);
  };

  return (
    <div>
      <h2>QR Code Generator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter text:
          <input type="text" value={text} onChange={handleChange} />
        </label>
        <button type="submit">Generate QR Code</button>
      </form>
      {qrCodeText && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <QRCode
            value={qrCodeText}
            renderAs="svg"
            level="L"
            bgColor="transparent"
            fgColor="url(#gradient)"
            size={256}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "var(--clr2)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "var(--clr1)", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
