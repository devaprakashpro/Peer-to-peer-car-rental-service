const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
})


const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const contactsRoutes = require('./routes/contact-us');
const tutorRoutes = require('./routes/tutorRoutes');
const carRoutes = require('./routes/carRoutes');
const searchRoutes = require('./routes/searchRoutes');
const reserveTutorRoutes = require('./routes/reserveTutorRoutes');
const rentCarRoutes = require('./routes/rentCarRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const adminRoutes = require('./routes/adminRoutes');




app.use('/api/users',userRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api',contactsRoutes);
app.use('/api', tutorRoutes);
app.use('/api', carRoutes)
app.use('/api/tutor-image', express.static('upload/tutors'))
app.use('/api/car-image', express.static('upload/cars'))
app.use('/api', searchRoutes);
app.use('/api', reserveTutorRoutes);
app.use('/api', rentCarRoutes);
app.use('/api', sessionRoutes);
app.use('/api', adminRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});