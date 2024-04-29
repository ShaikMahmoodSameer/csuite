const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { handleErrorLog } = require('../utils/handleError');
const privateKey = process.env.TOKEN_SECRET_KEY;
require('dotenv').config();
const createpoolConnection = require("../../config/database");
const { verifyAdmin } = require('../middlewares/adminAuthenticationMiddleware');
const pool = createpoolConnection();

const getAdminInfo = async (req, res) => {
    try {
      res.json({ Status: "ok", adminId: req.adminId });
    } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
}

router.get('/', verifyAdmin, getAdminInfo);

router.post('/login', (req, res) => {
    const { adminId, password } = req.body;
    pool.query('SELECT * FROM admins WHERE admin_id = ?', [adminId], (err, userData) => {
        if (err) handleErrorLog("admin Id not being fetched!", err);
        else {
            if (userData.length === 0) { return res.status(404).json({ Status: `Admin Not Found!` }) }
            else {
                if (userData[0].password === password) {
                    const adminId = userData[0].admin_id;
                    const tokenPayload = { sub: adminId };
                    const token = jwt.sign(tokenPayload, privateKey, { expiresIn: "1d" });
                    res.cookie('token', token);
                    return res.status(200).json({ Status: "Verified", adminId: adminId });
                } else {
                    return res.status(401).json({ Status: "WrongPassword" });
                }
            }

        }
    });
});



router.post('/register', (req, res) => {
    const { name, email, password } = req.body.values;

    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) return res.json({ Error: "Database error" });

        if (results.length > 0) {
            return res.json({ Status: "UserExist" });
        } else {
            bcrypt.hash(password.toString(), salt, (err, hash) => {
                if (err) {
                    return res.json({ Error: "Error for hashing password" });
                }

                const userValues = [name, email, hash];
                const userInsertQuery = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?,?,?)';

                pool.query(userInsertQuery, userValues, (insertError, userResponse) => {
                    if (insertError) {
                        return res.json({ Error: "Insertion Error" });
                    }

                    // After successfully inserting the user, create a new cart for the user
                    const userId = userResponse.insertId; // Get the newly inserted user's ID
                    const cartValues = [userId, new Date()]; // Assuming 'created_at' is the current timestamp
                    const cartInsertQuery = 'INSERT INTO cart (`user_id`, `created_at`) VALUES (?,?)';

                    pool.query(cartInsertQuery, cartValues, (cartInsertError, cartResponse) => {
                        if (cartInsertError) {
                            return res.json({ Error: "Cart Insertion Error" });
                        }

                        return res.json({ Status: "Success" });
                    });
                });
            });
        }
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: "Success" });
})

//=========================profile=============================================
router.get('/profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM user_profile WHERE user_id = ?';
    pool.query(sql, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.json({ profileExists: false });
        } else {
            const profileData = results[0];
            const getRegMobNumQ = 'SELECT * FROM users WHERE user_id = ?';
            pool.query(getRegMobNumQ, [userId], (err, innerResults) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                profileData.registered_mobile = innerResults[0].mobile_number;
                return res.json({ profileExists: true, profileData });
            });
        }
    });
});


router.post('/profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const profileData = req.body;

    // Use a different variable name for the result from the first query
    pool.query(`SELECT * FROM users WHERE user_id = ${userId}`, (errSelect, userResult) => {
        if (errSelect) {
            console.error('Error executing SELECT query:', errSelect);
            return res.status(500).json({ error: 'Error retrieving user data' });
        }

        if (userResult.length === 0) {
            // No user found with the specified userId
            return res.status(404).json({ error: 'User not found' });
        }

        const query = 'INSERT INTO user_profile (user_id, fullname, date_of_birth, gender, mobile_number, email, alternate_mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [
            userId,
            profileData.fullName,
            profileData.dateOfBirth,
            profileData.gender,
            userResult[0].mobile_number, // Use mobile_number from the userResult
            profileData.email,
            profileData.alternateMobile
        ];

        pool.query(query, values, (errInsert, results) => {
            if (errInsert) {
                console.error('Error executing INSERT query:', errInsert);
                return res.status(500).json({ error: 'Failed to save profile data' });
            }

            return res.json({ profileAdded: true });
        });
    });
});


router.post('/updateprofile/:userId', (req, res) => {
    const userId = req.params.userId;
    const profileData = req.body;

    const query = 'UPDATE user_profile SET fullname=?, date_of_birth=?, gender=?, email=?, alternate_mobile_number=? WHERE user_id=?';
    const values = [
        profileData.fullName,
        profileData.dateOfBirth,
        profileData.gender,
        profileData.email,
        profileData.alternateMobile,
        userId,
    ];

    pool.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing database query:', err);
            return res.status(500).json({ error: 'Failed to update profile data', err });
        }
        return res.json({ profileUpdated: true });
    });
});

router.get('/getpoptests', (req, res) => {
    const codes = req.query.codes;

    // Ensure that codes is an array
    if (!Array.isArray(codes)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const query = `SELECT * FROM tests WHERE test_name IN (?)`;

    pool.query(query, [codes], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json(results);
        }
    });
});


// Password reset
router.post("/reset-password", async (req, res) => {
    const { email } = req.body;
    try {
        const q = "SELECT * FROM users WHERE email = ?"
        pool.query(q, [email], (err, oldUserData) => {
            if (err) {
                console.error('Error in user query:', err);
                return res.json({ err: "Error at resetting password query" });
            }
            if (oldUserData.length === 0) {
                return res.json({ err: `email doesn't exist!` });
            }
            oldUserData = oldUserData[0];
            const secret = privateKey + oldUserData.password;
            const token = jwt.sign({ email: oldUserData.email, id: oldUserData.user_id }, secret, { expiresIn: "5m" });
            const newPswdGenLink = `http://localhost:3210/reset-password/${oldUserData.user_id}/${token}`;
            // console.log(newPswdGenLink);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'shaikmahmoodsameer@gmail.com',
                    pass: 'wxpzwnsdwarqbilu'
                }
            });
            var mailOptions = {
                from: 'shaikmahmoodsameer@gmail.com',
                to: email,
                subject: 'Password resetting link...',
                text: newPswdGenLink
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                } else {
                    return res.json({ emailSent: true, message: `Email sent: ${info.response}` });
                }
            });
        })
    } catch (error) {
        console.error({ error: "err at connecting to db and getting user with entered email" });
    }
})

router.get("/reset-password/:user_id/:token", (req, res) => {
    const { user_id, token } = req.params;
    const q = "SELECT * FROM users WHERE user_id = ?"
    pool.query(q, [user_id], (err, oldUserData) => {
        if (err) {
            console.error('Error in user query:', err);
            return res.json({ err: "Error at resetting password query" });
        }
        if (oldUserData.length === 0) {
            return res.json({ err: `User with entered user_id doesn't exist` });
        }
        oldUserData = oldUserData[0];
        const secret = privateKey + oldUserData.password;
        try {
            const verified = jwt.verify(token, secret);
            res.render('ResetPasswordTemp', { email: verified.email, Status: "Not Verified!" });
        } catch (error) {
            res.send("not verifiid!")
        }
    })
})

router.post("/reset-password/:user_id/:token", async (req, res) => {
    const { user_id, token } = req.params;
    const { password } = req.body;
    const q = "SELECT * FROM users WHERE user_id = ?";

    pool.query(q, [user_id], (err, oldUserData) => {
        if (err) {
            console.error('Error in user query:', err);
            return res.json({ err: "Error at resetting password query" });
        }

        if (oldUserData.length === 0) {
            return res.json({ err: `User with entered user_id doesn't exist` });
        }

        oldUserData = oldUserData[0];
        const secret = privateKey + oldUserData.password;

        try {
            const verified = jwt.verify(token, secret);

            bcrypt.hash(password.toString(), salt, (err, hashed) => {
                if (err) {
                    return res.json({ err: "Error at password bcrypt" });
                }
                const passwordUpdateQuery = "UPDATE users SET password = ? WHERE user_id = ?";
                pool.query(passwordUpdateQuery, [hashed, user_id], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.json({ err });
                    }
                    // res.json({ message: "Password updated successfully" });
                    res.render('ResetPasswordTemp', { email: verified.email, Status: "Verified!" })
                });
            });

        } catch (error) {
            res.send("Not verified!");
        }
    });
});

module.exports = router