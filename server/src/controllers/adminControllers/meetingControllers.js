const meetingServices = require('../../services/adminServices/meetingServices');
const { handleErrorLog } = require('../../utils/handleError');
const { sendWtspMeetingTblAssigned } = require('../../utils/sendWtspMeetingTblAssigned');

const getMtngTbls = (req, res) => {
    meetingServices.getMeetingTbls((error, response) => {
        if (error) return handleErrorLog("Unable to get Meeting Table: ", error);

        res.status(200).json(response);
    })
}

const addMtngTbl = (req, res) => {
    const newMtngTblData = req.body;
    meetingServices.addMtngTbl(newMtngTblData, (error, response) => {
        if (error) return handleErrorLog("Unable to Add New Meeting Table: ", error);

        if (response){
            res.status(200).json({Status: "Success"});
        }
    })
}

const getMtngTblSessGuests = (req, res) => {
    meetingServices.getMtngTblSessGuests(req.query, (error, response) => {
        if (error) return handleErrorLog("Unable to get Meeting Table Guests: ", error);

        if (response){
            res.status(200).json(response);
        }
    })
}

const addGuestsToMtngTbl = async (req, res) => {
    meetingServices.addGuestsToMtngTbl(req.body, async (error, response) => {
        if (error) return handleErrorLog("Unable to Add New Meeting Table Guests: ", error);

        if (response){
            const GuestsData = [];
            await Promise.all(response.map(async (item, idx) => {
                const { insertId } = item;
                try {
                    const GIRes = await meetingServices.getMeetinGuestInfo(insertId);
                    if(GIRes){ GuestsData.push(GIRes[0]) }
                } catch (err) {
                    return handleErrorLog("Error fetching guests data of added to mtng tble: ", err);
                }
            }));

            for(const guest of GuestsData){
                const { mobile_number, bnf_name, company, designation, tbl_room, tbl_no, m_tbl_session, ticket_number } = guest;
                const otherMembers = GuestsData.filter(g => g !== guest).map(g => `${g.bnf_name} (${g.designation} - ${g.company})`).join(', ');
                // console.log(`Dear ${bnf_name} (bnf_name),\nWelcome to C Suite Sumflex 2024!\nBelow, you'll find your meeting schedule for the day:\n\nMeeting with\n${otherMembers}\n\nLocation: ${tbl_room} (tbl_room)\nTable: ${tbl_no} (tbl_no)\nTime: ${m_tbl_session} (session)\nTicket Number: ${ticket_number}\n--------------------------------------`);
                await sendWtspMeetingTblAssigned({
                    userMobileNumber: mobile_number,
                    ticketQrImageLink: "https://nutrifycsuite.com/images/scanner_img.jpg",
                    ticketNumber: ticket_number,
                    name: bnf_name,
                    otherMembers: otherMembers,
                    tblRoom: tbl_room,
                    tableNo: tbl_no,
                    session: m_tbl_session
                });
            }
            res.status(200).json({Status: "Success"});
        }
    })
}


module.exports = {
    getMtngTbls,
    addMtngTbl,
    getMtngTblSessGuests,
    addGuestsToMtngTbl
}