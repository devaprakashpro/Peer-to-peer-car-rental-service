users
  - id (integer, primary key)
  - username (string, unique, not null)
  - email (string, unique, not null)
  - password (string, not null)

students
  - id (integer, primary key)
  - user_id (integer, foreign key references users(id))
  - name (string, not null)
  - phone (string)
  - address (text)

tutors
  - id (integer, primary key)
  - user_id (integer, foreign key references users(id))
  - name (string, not null)
  - phone (string)
  - address (text)
  - is_own_car (boolean, not null, default false)

cars
  - id (integer, primary key)
  - motor_type (string, not null)
  - model (string, not null)
  - year (integer, not null)
  - color (string)
  - license_plate (string, unique, not null)
  - available (boolean, not null, default true)
  - owner_id (integer, foreign key references users(id))
  - tutor_id (integer, foreign key references tutors(id))

tutor_reservations
  - id (integer, primary key)
  - student_id (integer, foreign key references students(id))
  - tutor_id (integer, foreign key references tutors(id))
  - start_time (timestamp, not null)
  - end_time (timestamp, not null)
  - location (text)
  - status (string)

reservation_payments
  - id (integer, primary key)
  - reservation_id (integer, foreign key references tutor_reservations(id))
  - amount (numeric, not null)
  - payment_time (timestamp, not null)

tutor_payments
  - id (integer, primary key)
  - tutor_id (integer, foreign key references tutors(id))
  - amount (numeric, not null)
  - payment_time (timestamp, not null)
  
rentals
  - id (integer, primary key)
  - user_id (integer, foreign key references users(id))
  - reservation_id (integer, foreign key references tutor_reservations(id))
  - car_id (integer, foreign key references cars(id))
  - start_time (timestamp, not null)
  - end_time (timestamp, not null)
  - pickup_location (text)
  - return_location (text)
  - status (string)

rental_payments
  - id (integer, primary key)
  - rental_id (integer, foreign key references rentals(id))
  - amount (numeric, not null)
  - payment_time (timestamp, not null)