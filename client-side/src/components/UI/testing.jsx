import React, { useState } from "react";

const TutorApplicationForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    experience_years: "",
    interview_time: "",
    interview_date: "",
    working_location: "",
    bio: "",
    is_own_car: "",
    driver_image: null,
    driver_license: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitTutorHandler = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append all the form data to the FormData object
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("/tutors-applicants/{user_id}", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        // You can reset the form or do any other task after success
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the application.");
    }
  };

  return (
    <form onSubmit={submitTutorHandler}>
      <div className="form-group">
        <input
          type="text"
          required
          placeholder="Enter First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          required
          placeholder="Enter Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          required
          placeholder="Enter Your Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          required
          placeholder="Enter Your Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          required
          placeholder="Enter Your Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="tel"
          required
          placeholder="Enter Your Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          required
          placeholder="Enter Your Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          required
          placeholder="Enter Years of Experience"
          name="experience_years"
          value={formData.experience_years}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="file"
          required
          name="driver_image"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="file"
          required
          name="driver_license"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="time"
          required
          name="interview_time"
          value={formData.interview_time}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          required
          name="interview_date"
          value={formData.interview_date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          required
          placeholder="Enter Working Location"
          name="working_location"
          value={formData.working_location}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <select
          name="is_own_car"
          onChange={handleChange}
          value={formData.is_own_car}
        >
          <option value="">Do You Have A Car?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="form-group">
        <textarea
          rows={5}
          required
          placeholder="Write A Brief About Yourself"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit">Apply Now</button>
    </form>
  );
};

export default TutorApplicationForm;
