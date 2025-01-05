
CREATE DATABASE IF NOT EXISTS carcoach;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  reset_token VARCHAR(255) DEFAULT NULL,
  reset_token_expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  is_tutor BOOLEAN,
  is_student BOOLEAN,
  is_admin BOOLEAN,
);

CREATE TABLE IF NOT EXISTS tutors_applicants (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  age INTEGER NOT NULL,
  gender VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  is_own_car BOOLEAN,
  is_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  experience_years INTEGER NOT NULL,
  driver_license VARCHAR(255) NOT NULL,
  driver_image VARCHAR(255) NOT NULL,
  working_location VARCHAR(255) NOT NULL,
  interview_time TIME NOT NULL,
  interview_date DATE NOT NULL,
  bio TEXT NOT NULL,
  rating INTEGER
);

CREATE TABLE IF NOT EXISTS car_uploads (
  id SERIAL PRIMARY KEY,
  tutor_id INTEGER REFERENCES tutors_applicants(id),
  owner_id INTEGER REFERENCES users(id),
  motor_type VARCHAR(255) NOT NULL CHECK (motor_type IN ('manual', 'automatic')),
  model VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  color VARCHAR(255),
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  car_image VARCHAR(255) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  usage VARCHAR(255) NOT NULL CHECK (usage IN ('coaching', 'renting')),
  hour_price INTEGER NOT NULL,
  hour_speed INTEGER NOT NULL,
  details TEXT,
  rating INTEGER,
  available_from DATE,
  is_tutor BOOLEAN NOT NULL DEFAULT FALSE,
  from_address VARCHAR(255),
  to_address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tutor_reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  tutor_id INTEGER REFERENCES tutors_applicants(id),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  reservation_time TIMESTAMP WITH TIME ZONE NOT NULL,
  package_price VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  reservation_id INTEGER REFERENCES tutor_reservations(id),
  status VARCHAR(255) NOT NULL DEFAULT('active'),
  left_sessions INTEGER NOT NULL DEFAULT(12),
  final_evaluation VARCHAR(255) NOT NULL DEFAULT('pending till finishing sessions')
);

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  admin_id INTEGER REFERENCES users(id),
  start_time TIME NOT NULL,
  location TEXT,
  feedback VARCHAR(255) DEFAULT('pending till session end'),
  session_date DATE NOT NULL,
  session_duration VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS renters (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS rental_reservations (
  id SERIAL PRIMARY KEY,
  car_id INTEGER REFERENCES car_uploads(id),
  renter_id INTEGER REFERENCES renters(id),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  pickup_location TEXT,
  return_location TEXT,
  payment_method VARCHAR(255) NOT NULL,
  reservation_time TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  message_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

