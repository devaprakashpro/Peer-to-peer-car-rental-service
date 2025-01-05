const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2; 
const multer = require('multer');

dotenv.config();



function sendEmail({ email, name}) {
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
      subject: 'Acceptance Email',
      text: `Dear ${name}, Congratulations you have been accepted as a driving tutor in our platform`,
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

const router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer();

router.post('/tutors-applicants/:id?', upload.fields([
    { name: 'driver_license', maxCount: 1 },
    { name: 'driver_image', maxCount: 1 }
  ]), async (req, res) => {
    try {
        const user_id = req.params.id || null;
        if(user_id==null){
            res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
        }else{
            const {
                first_name,
                last_name,
                phone,
                email,
                gender,
                working_location,
                age,
                address,
                is_own_car,
                experience_years,
                interview_time,
                interview_date,
                bio
            } = req.body;

            const driverLicense = req.files['driver_license'][0];
            const driverImage = req.files['driver_image'][0];

            const imageUrls = [];
            const errors = [];
      
            // Function to upload an image to Cloudinary and return a promise
            const uploadImageToCloudinary = (file) => {
              return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream((error, result) => {
                  if (result) {
                    resolve(result.secure_url);
                  } else if (error) {
                    reject(error);
                  }
                }).end(file.buffer);
              });
            };
                 // Upload driver license image
            try {
              const resultLicense = await uploadImageToCloudinary(driverLicense);
              imageUrls.push(resultLicense);
            } catch (error) {
              console.error(error);
              errors.push("An error occurred during driver license image upload.");
            }

            // Upload driver image
            try {
              const resultImage = await uploadImageToCloudinary(driverImage);
              imageUrls.push(resultImage);
            } catch (error) {
              console.error(error);
              errors.push("An error occurred during driver image upload.");
            }

            if (errors.length > 0) {
              res.status(500).json({ message: 'Errors occurred during image upload' });
            }else{
              let tutorId;
              if(is_own_car === "true"){
                  const result = await pool.query(
                      `INSERT INTO tutors_applicants (user_id, first_name, last_name, phone, email, age, gender, address, experience_years, driver_license, driver_image, working_location, interview_time, interview_date, bio, is_own_car) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, true) RETURNING *`, 
                      [user_id, first_name, last_name, phone, email, age, 
                        gender, address, experience_years, 
                        imageUrls[0], imageUrls[1], 
                        working_location, interview_time, 
                        interview_date, 
                        bio,
                      ]);
                   tutorId = result.rows[0].id;
                  res.status(201).send({
                      tutorId: tutorId, 
                      redirectionLink:`https://car-coach-grad-project.vercel.app/join-us/${user_id}/upload-car/${tutorId}`,
                      message: "Successfully uploaded"
                  })
                  console.log(tutorId);
              }else if(is_own_car === "false"){
                  const result = await pool.query(
                      `INSERT INTO tutors_applicants (user_id, first_name, last_name, phone, email, age, gender, address, experience_years, driver_license, driver_image, working_location, interview_time, interview_date, bio, is_own_car) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, false) RETURNING *`, 
                      [user_id, first_name, last_name, phone, email, age, 
                        gender, address, experience_years, 
                        imageUrls[0], imageUrls[1], 
                        working_location, interview_time, 
                        interview_date, 
                        bio
                      ]);
                   tutorId = result.rows[0].id;
                   res.status(201).json({tutorId: tutorId, message: "Successfully uploaded! We Will contact You Soon!"});
              }
          }
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
})

router.post('/tutors-applicants/car/:tutorId', upload.single('car_image'), async(req, res)=>{
    try {
        const {tutorId} = req.params
        const{ motor_type, color, model, year, license_plate, hour_price, hour_speed, details} = req.body;
        const car_image = req.file.buffer; // Image data from the upload

        // Upload the image to Cloudinary
        await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(async (error, result) => {
            if (result) {
              const car_image_url = result.secure_url; 
              const carInsert = await pool.query(`INSERT INTO car_uploads (tutor_id, motor_type, color, model, year, license_plate, car_image, hour_price, hour_speed, details, usage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'coaching') RETURNING id`, [
                  tutorId,
                  motor_type, 
                  color,
                  model,
                  year,
                  license_plate,
                  car_image_url,
                  hour_price,
                  hour_speed,
                  details
              ]);
              res.status(201).json({message: "Uploaded successfully, We Will contact You Soon!"})
              resolve();
            } else if (error) {
              console.error(error);
              res.status(500).json({ message: 'An error occurred' });
              reject();
            }
          }).end(car_image);
        });
      }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})


router.get("/tutors-applicants-all/:searchBy?", async (req, res)=>{
    try {
      const {searchBy} = req.params || { searchBy: null };
      let response;
      if (searchBy && searchBy === 'female') {
        const result = await pool.query(`SELECT * FROM tutors_applicants WHERE is_accepted=true AND gender = 'female'`);
        response = result.rows;
      } else if (searchBy && searchBy === 'male') {
        const result = await pool.query(`SELECT * FROM tutors_applicants WHERE is_accepted=true AND gender = 'male'`);
        response = result.rows;
      } else {
        const result = await pool.query('SELECT * FROM tutors_applicants WHERE is_accepted=true');
        response = result.rows;
      }
      if(response){
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  })


router.get("/tutors-applicants/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT is_accepted, first_name, last_name, phone, age, gender, experience_years, driver_image, working_location, bio, email FROM tutors_applicants WHERE id = ($1)', [
            id
        ]);
        const is_accepted = result.rows[0].is_accepted
        if(is_accepted===true){
            const {first_name, last_name, phone, age, gender, experience_years, driver_image, working_location, bio, email, rating} = result.rows[0];
            const response = {
                name: `${first_name} ${last_name}`,
                phone,
                email,
                age,
                gender,
                experience_years,
                working_location,
                bio,
                driver_image, 
                rating
            }
            res.status(200).json(response);
        }
        else {
            res.json("sorry you didn't get accepted");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

 //update tutor acceptance in tutors_applicants table and is_tutor in users table -- by admin
  router.put("/tutors-applicants-admins/:tutor_id", async (req, res)=>{
    try {
        const {tutor_id} = req.params;
        const update1 = await pool.query(`UPDATE tutors_applicants SET is_accepted = true WHERE id=${tutor_id}`);
        const resultUserId = await pool.query(`SELECT user_id FROM tutors_applicants WHERE id=${tutor_id}`);
        const {user_id} = resultUserId.rows[0];
        const update2 = await pool.query(`UPDATE users SET is_tutor = true WHERE id=${user_id}`);
        const tutorData = await pool.query(`SELECT first_name, email From tutors_applicants WHERE id = ${tutor_id}`);
        const {first_name, email} = tutorData.rows[0];
        sendEmail({name: first_name, email}); 
        res.status(200).json({message: "Updated Successfully and email sent!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

module.exports = router;