const express = require('express');
const router = express.Router();
const pool = require('../db');
const nodemailer = require('nodemailer');


function sendEmail({ email, studentName, sessionDetails}) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Upcoming Drive Coaching Session',
      text: `Dear ${studentName}, Here are the details of your upcoming session: ${sessionDetails}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

router.post('/sessions/:id?/:student_id', async (req, res) => {
    const { startTime, sessionDate, sessionDuration, SessionLocation } = req.body;
    const admin_id = req.params.id || null;
    const {student_id} = req.params
    try {
      if(admin_id==null){
        res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
      }else{
        const data = await pool.query(
          'INSERT INTO sessions (admin_id, student_id, start_time, session_date, session_duration, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
         [admin_id, student_id, startTime, sessionDate, sessionDuration, SessionLocation]
        );
         const sessionData = data.rows[0];
        const getStudentData = await pool.query(`SELECT tr.name, tr.email FROM  tutor_reservations tr JOIN students st
        ON tr.id = st.reservation_id WHERE st.id = ${student_id} `);
        const {name, email} = getStudentData.rows[0]
        sendEmail({email, studentName: name, 
        sessionDetails: `Your upcoming session is at ${sessionData.start_time} on ${sessionData.session_date} and will be for ${sessionData.session_duration} your session location is ${sessionData.location}. Don't be late!`});
        res.status(201).json({doneMessage: "Data Uploaded Successfully Thank You!"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/sessions-students/:user_id?", async (req, res)=>{
    const {user_id} = req.params || null;
    try {
        if(user_id==null){
            res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
        }else{
            const getReservationId = await pool.query(`SELECT id FROM tutor_reservations WHERE user_id = ${user_id}`);
            if(getReservationId.rowCount>0){
              const reservation_id = getReservationId.rows[0].id;
              const getStudentId = await pool.query(`SELECT id FROM students WHERE reservation_id = ${reservation_id}`);
              if(getStudentId.rowCount>0){
                const student_id = getStudentId.rows[0].id;
                const studentTutor = await pool.query(`SELECT ta.first_name, ta.last_name
                FROM tutors_applicants ta
                JOIN tutor_reservations tr ON ta.id = tr.tutor_id
                JOIN students st ON tr.id = st.reservation_id
                JOIN sessions s ON st.id = s.student_id
                WHERE st.id = ${student_id}`);
                const {first_name, last_name} = studentTutor.rows[0];
                const upcomingSession = await pool.query(`SELECT session_date, session_duration, start_time, location
                FROM sessions WHERE student_id = ${student_id}`);
                const sessionDetails = upcomingSession.rows[0];
                const data = await pool.query(`SELECT left_sessions FROM students WHERE id = ${student_id}`);
                const {left_sessions} = data.rows[0]
                res.status(200).json({
                    tutorName: `${first_name} ${last_name}`,
                    sessionsDetails: {sessionDetails, left_sessions}
                })
              }else{
                res.status(404).json({message: "Not Found"})
              }
            }else{
              res.status(404).json({message: "Not Found"})
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

  router.get("/sessions-tutors/:user_id?", async (req, res)=>{
    const {user_id} = req.params || null;
    try {
        if(user_id==null){
            res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
        }else{
            const getTutorId = await pool.query(`SELECT id FROM tutors_applicants WHERE user_id = ${user_id}`);
            const tutor_id = getTutorId.rows[0].id;
            const response = await pool.query(`SELECT tr.name, tr.phone, tr.email, st.status, st.left_sessions, s.start_time, 
            s.location, s.session_date, s.session_duration 
            FROM tutor_reservations tr
            JOIN students st ON tr.id = st.reservation_id 
            JOIN sessions s ON st.id = s.student_id WHERE tr.tutor_id=${tutor_id}`);
            const studentsData  = response.rows;
            res.status(200).json(studentsData)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })


module.exports = router;