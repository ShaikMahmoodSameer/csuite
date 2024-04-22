const fs = require('fs');
const path = require('path');

const saveImage = (imageData, res) => {
  // Save image to server
  const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');
  const imageName = `image-${Date.now()}.jpg`;
  const imagePath = path.join(__dirname, 'public', 'images', 'ticket-qr-codes', imageName);

  fs.writeFile(imagePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).json({ error: 'Failed to save image' });
    }

    const imageUrl = `http://localhost:3214/images/ticket-qr-codes/${imageName}`;
    res.status(200).json({ imageUrl });
  });
};


  module.exports = {
    saveImage
  }