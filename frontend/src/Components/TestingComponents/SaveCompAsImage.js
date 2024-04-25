import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';

const SaveCompAsImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const transformToImage = async () => {
    const node = document.getElementById('my-node');
    const canvas = await html2canvas(node);
    const imageData = canvas.toDataURL('image/jpeg');

    // Send image data to Node.js server
    axios.post(`${BASE_URL}/save-image`, { imageData })
      .then(response => {
        setImageUrl(response.data.imageUrl);
      })
      .catch(error => {
        console.error('Error saving image:', error);
      });
  };

  return (
    <div>
      <button onClick={transformToImage}>Transform to Image</button>
      <div id="my-node">
        {/* Your content to be transformed */}
        <h1>Hello, World! {imageUrl} </h1>
        <img src="/images/qr_img.jpg" alt="qr" />
      </div>
    </div>
  );
};

export default SaveCompAsImage;