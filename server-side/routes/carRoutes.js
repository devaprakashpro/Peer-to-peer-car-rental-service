const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2; 
const multer = require('multer');

dotenv.config();

const router = express.Router();

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer();

router.post('/car-uploads/:id?', upload.single('car_image'), async (req, res) => {
  try {
    const user_id = req.params.id || null;
    if (user_id == null) {
      res.json({
        unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"
      });
    } else {
      const { motor_type, color, model, year, license_plate, hour_price, hour_speed, details, available_from, usage, from_address } = req.body;
      const car_image = req.file.buffer; // Image data from the upload

      // Upload the image to Cloudinary
      await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(async (error, result) => {
          if (result) {
            const car_image_url = result.secure_url; // Use the secure URL provided by Cloudinary
            const carInsert = await pool.query(
              `INSERT INTO car_uploads (owner_id, motor_type, color, model, year, license_plate, car_image, hour_price, hour_speed, details, available_from, usage, from_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
              [
                user_id,
                motor_type,
                color,
                model,
                year,
                license_plate,
                car_image_url, // Store the Cloudinary URL
                hour_price,
                hour_speed,
                details,
                available_from,
                usage,
                from_address
              ]
            );
            res.status(201).json({
              doneMessage: "Thank You. Car Data Uploaded successfully!"
            });
            resolve();
          } else if (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
            reject();
          }
        }).end(car_image);
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
});



  router.get("/car-uploads-all/:searchBy?", async (req, res)=>{
    try {
      const {searchBy} = req.params || { searchBy: null };
      if (searchBy && searchBy.toUpperCase() === 'ASC') {
        const result = await pool.query(`SELECT * FROM car_uploads WHERE available=true AND usage='renting' ORDER BY hour_price ASC`);
        const response = result.rows;
        res.status(200).json(response);
      } else if (searchBy && searchBy.toUpperCase() === 'DESC') {
        const result = await pool.query(`SELECT * FROM car_uploads WHERE available=true AND usage='renting' ORDER BY hour_price DESC`);
        const response = result.rows;
        res.status(200).json(response);
      } else {
        const result = await pool.query(`SELECT * FROM car_uploads WHERE available=true AND usage='renting'`);
        const response = result.rows;
        res.status(200).json(response);
      }  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  })

  router.get("/car-uploads/:id", async (req, res)=>{
    try{
        const car_id = req.params.id;
        const result = await pool.query('SELECT * FROM car_uploads WHERE id = ($1)', [car_id]);
        const response = result.rows[0];
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

  module.exports = router;

