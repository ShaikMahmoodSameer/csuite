require('dotenv').config();
const createpoolConnection = require("../../config/database");
const pool = createpoolConnection();
const axios = require("axios");
// const bcrypt = require("bcrypt");
const salt = parseInt(process.env.SALT);

const getUser = (mobileNumber, callback) => {
    pool.query("SELECT * FROM users WHERE mobile_number = ?", [mobileNumber], (error, response) => {
        callback(error, response);
    }
    );
};

const getUserProfile = (userId, callback) => {
    const query = "SELECT * FROM user_profile WHERE user_id = ?";
    pool.query(query, [userId], (error, response) => {
        callback(error, response);
    });
};

// const loginOTP = (number, callback) => {
//     // Genetes OTP
//     let digits = "0123456789";
//     let OTP = "";
//     let noOfDigits = 4; //number of digits of an otp generated
//     for (let i = 0; i < noOfDigits; i++) { OTP += digits[Math.floor(Math.random() * 10)]; }

//     pool.query("SELECT * FROM users WHERE mobile_number = ?", [number], (error, response) => {
//         error && callback(error, null);

//         bcrypt.hash(OTP.toString(), salt, (bcrptterr, hash) => {
//             if (bcrptterr) {
//                 console.log("Error hashing password", bcrptterr);
//                 callback(bcrptterr, null);
//             } else {
//                 const query = response.length === 0
//                 ? "INSERT INTO users (mobile_number, otp) VALUES (?, ?) ON DUPLICATE KEY UPDATE otp = VALUES(otp)"
//                 : "UPDATE users SET otp = ? WHERE mobile_number = ?";
                
//                 const values = response.length === 0 ? [number, hash] : [hash, number];
                
//                 pool.query(query, values, (dberr, result) => {
//                     if (dberr) {
//                         console.error("Database error:", dberr);
//                         callback(dberr, null);
//                     } else {
//                         callback(error, {Status: "OTP sent!", otp: OTP})
//                     }
//                 });
//             }
//         });
//     });
// };

const loginOTP = (number, callback) => {
    // Generates OTP
    let digits = "0123456789";
    let OTP = "";
    let noOfDigits = 4; //number of digits of an otp generated
    for (let i = 0; i < noOfDigits; i++) { OTP += digits[Math.floor(Math.random() * 10)]; }

    pool.query("SELECT * FROM users WHERE mobile_number = ?", [number], (error, response) => {
        error && callback(error, null);

        const query = response.length === 0
            ? "INSERT INTO users (mobile_number, otp) VALUES (?, ?) ON DUPLICATE KEY UPDATE otp = VALUES(otp)"
            : "UPDATE users SET otp = ? WHERE mobile_number = ?";

        const values = response.length === 0 ? [number, OTP] : [OTP, number];

        pool.query(query, values, (dberr, result) => {
            if (dberr) {
                console.error("Database error:", dberr);
                callback(dberr, null);
            } else {
                callback(null, { Status: "OTP sent!", otp: OTP })
            }
        });
    });
};

module.exports = {
    getUser,
    getUserProfile,
    loginOTP,
};
