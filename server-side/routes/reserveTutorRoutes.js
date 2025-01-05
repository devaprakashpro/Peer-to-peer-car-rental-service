const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();


router.post('/tutor-reserve/:id?/:tutor_id', async (req, res) => {
    const { name, phone, email, payment_method, package_price, start_date, session_time, details } = req.body;
    const user_id = req.params.id || null;
    const {tutor_id} = req.params
    console.log(req.body);
    try {
      if(user_id==null){
        res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
      }else{
        const dataIsStudent = `UPDATE users SET is_student = true WHERE user_id =${user_id}`;
        const result = await pool.query(
          'INSERT INTO tutor_reservations (user_id, tutor_id, name, phone, email, payment_method, package_price, start_date, session_time, details, reservation_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP) RETURNING id',
         [user_id, tutor_id ,name, phone, email, payment_method, package_price, start_date, session_time, details]
        );
        const reservation_id =  result.rows[0].id;
        const result2 = await pool.query(
            'INSERT INTO students (reservation_id) VALUES ($1) RETURNING id',
            [reservation_id]);
        res.status(201).json({doneMessage: "We will contact you back shortly!"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;