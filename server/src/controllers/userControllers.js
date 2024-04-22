const userServices = require('../services/userServices');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const { handleError } = require('../utils/handleError')
const privateKey = process.env.TOKEN_SECRET_KEY;

const loginOTP = async (req, res) => {
    const { mobileNumber } = req.body;

    userServices.loginOTP(mobileNumber, (error, response) => {
        if (error) handleError("DB Error", res, error);

        res.status(200).json(response);
    })
}

const getUserInfo = async (req, res) => {
    try {
      res.json({ Status: "ok", userId: req.userId });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

// const verifyOTP = async (req, res) => {
//     const { mobileNumber, otp } = req.body;

//     userServices.getUser(mobileNumber, (error, userdata) => {
//         if (error) return handleError("DB Error fetching user", res, error);

//         if (userdata.length === 0) return res.status(401).json({ error: "User not found" });

//         bcrypt.compare(otp.toString(), userdata[0].otp, (bcryptCompareError, response) => {
//             if (bcryptCompareError) return handleError("OTP mismatch. Try Again", res, bcryptCompareError);

//             if (response) {
//                 const userId = userdata[0].user_id;
//                 // console.log(user_id);
//                 const tokenPayload = { sub: userId };
//                 const token = jwt.sign(tokenPayload, privateKey, { expiresIn: "1h" });
//                 res.cookie('token', token);
//                 return res.json({ Status: "Verified", userId: userId });
//             } else {
//                 return res.status(200).json({ Status: "wrongOTP" });
//             }
//         });
//     })
// }

const verifyOTP = async (req, res) => {
    const { mobileNumber, otp } = req.body;

    userServices.getUser(mobileNumber, (error, userdata) => {
        if (error) return handleError("DB Error fetching user", res, error);

        if (userdata.length === 0) return res.status(401).json({ error: "User not found" });

        if (userdata[0].otp === otp) {
            const userId = userdata[0].user_id;
            const tokenPayload = { sub: userId };
            const token = jwt.sign(tokenPayload, privateKey, { expiresIn: "1h" });
            res.cookie('token', token);
            return res.json({ Status: "Verified", userId: userId });
        } else {
            return res.status(200).json({ Status: "wrongOTP" });
        }
    });
};

const ticketPrice = async (req, res) => {
    return res.status(200).json({ ticketPrice: 5200 });
}


module.exports = {
    loginOTP,
    getUserInfo,
    verifyOTP,
    ticketPrice
};