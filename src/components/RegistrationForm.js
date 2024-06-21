import React, { useState } from 'react';
import './RegistrationForm.css';

// Custom hook for form validation
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert(`Form Submitted Successfully\n${JSON.stringify(values, null, 2)}`);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

const RegistrationForm = () => {
  const initialValues = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: '',
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.age) {
      errors.age = 'Age is required';
    } else if (values.age <= 0) {
      errors.age = 'Age must be greater than 0';
    }
    if (values.attendingWithGuest && !values.guestName) {
      errors.guestName = 'Guest Name is required';
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);

  return (
    <>
   
    <h1>Event Registration form</h1>
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name:</label>
        <input
          className={`form-input ${errors.name && 'form-input-error'}`}
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          className={`form-input ${errors.email && 'form-input-error'}`}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Age:</label>
        <input
          className={`form-input ${errors.age && 'form-input-error'}`}
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
        />
        {errors.age && <p className="form-error">{errors.age}</p>}
      </div>
      <div className="form-group form-checkbox-group">
        <label className="form-label">Are you attending with a guest?</label>
        <input
          className="form-checkbox"
          type="checkbox"
          name="attendingWithGuest"
          checked={values.attendingWithGuest}
          onChange={handleChange}
        />
      </div>
      {values.attendingWithGuest && (
        <div className="form-group">
          <label className="form-label">Guest Name:</label>
          <input
            className={`form-input ${errors.guestName && 'form-input-error'}`}
            type="text"
            name="guestName"
            value={values.guestName}
            onChange={handleChange}
          />
          {errors.guestName && <p className="form-error">{errors.guestName}</p>}
        </div>
      )}
      <button className="form-button" type="submit">Submit</button>
    </form>
    </>
  );
};

export default RegistrationForm;
