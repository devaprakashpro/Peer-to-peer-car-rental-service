const express = require('express');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      if(!firstName || !lastName || !email || !password){
        res.json({errorMessage: "You must fill all the required fields"})
      }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (first_name, last_name, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, email, hashedPassword, "data"]);
        const id = result.rows[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const insertToken = await pool.query('UPDATE users SET token = $1 WHERE id = $2', [token, id]);
        res.status(201).json({ token, id });
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      if(!email || !password){
        res.json({errorMessage: "You must fill all the required fields"})
      }else{
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const updateToken = await pool.query('UPDATE users SET token = $1 WHERE id = $2', [token, user.id]);
        if(user.is_admin === true){
          res.json({ token, id: user.id, redirectUrl: `https://car-coach-grad-project.vercel.app/admin/${user.id}/users`});
        }else{
          res.json({ token, id: user.id, redirectUrl: `https://car-coach-grad-project.vercel.app/home/${user.id}`});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
  
    function verifyToken(req, res, next) {
      
      const token = req.headers.authorization.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).send('Unauthorized request');
      }
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token', message: error.message });
      }
    }
    router.post('/signout', verifyToken, (req, res) =>{
      res.status(200).send('User signed out successfully');
    })


  router.get("/", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM users`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

  // make user an admin -- by admin
  router.put("/:id", async (req, res)=>{
    try {
      const user_id = req.params.id;
        const result = await pool.query(`UPDATE users SET is_admin = true WHERE id=${user_id}`);
        res.status(200).json({message: "Updated Successfully!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })


module.exports = router;