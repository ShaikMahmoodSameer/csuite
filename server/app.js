const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(cors({
    origin: ["http://localhost:3124", "http://localhost:3125"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}));

// ------------------------------------------------------------
const { sendOTP } = require('./src/utils/sendOTP');
const { sendWhatsAppMessage } = require('./src/utils/sendWhatsAppMessage');
const { saveImage } = require('./src/utils/saveImage');

const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const couponRoutes = require('./src/routes/couponRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
app.use('/user', userRoutes);
app.use('/payments', paymentRoutes);
app.use('/coupons', couponRoutes);
app.use('/orders', orderRoutes);
app.use('/ticket', ticketRoutes);
app.use('/admin', adminRoutes);

// ------------------------------------------------------------
app.get('/', (req, res) => {
  res.json('Hello! from CSuite Summit Server- #CS_summit');
})

app.listen(process.env.PORT || 8081, () => {
  console.log("server app running on port: " + port);
})

app.post('/save-image', (req, res) => {
  const { imageData } = req.body;
  saveImage(imageData, res);
});

app.get('/send-whatsapp-message', (req, res) => {
  sendWhatsAppMessage(res);
})

app.post('/send-otp/:number', (req, res) => {
  const { number } = req.params;
  const otp = 123456;
  sendOTP(number, otp);
})

app.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({ Status: "Success" });
})


