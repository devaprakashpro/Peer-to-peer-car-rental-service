const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();


router.get("/search-car/high", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM car_uploads WHERE usage='renting' AND available=true  ORDER BY hour_price DESC`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

router.get("/search-car/low", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM car_uploads WHERE available=true AND usage='renting' ORDER BY hour_price ASC`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})


router.get("/search-tutor/male", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM tutors_applicants WHERE gender='male'AND is_accepted=true`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

router.get("/search-tutor/female", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM tutors_applicants WHERE gender='female' AND is_accepted=true`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

module.exports = router;