import React, { useState } from 'react';
import './JobRegistrationForm.css';

// Custom hook for form validation
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setValues({
        ...values,
        additionalSkills: {
          ...values.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
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

const JobRegistrationForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: '',
  };

  const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((values.position === 'Developer' || values.position === 'Designer') && (!values.relevantExperience || values.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience is required and must be a number greater than 0';
    }
    if (values.position === 'Designer' && (!values.portfolioURL || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioURL))) {
      errors.portfolioURL = 'Portfolio URL is required and must be a valid URL';
    }
    if (values.position === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(values.additionalSkills).some(skill => skill)) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);

  return (
    <>
   <h1>Job Application form</h1>
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Full Name:</label>
        <input
          className={`form-input ${errors.fullName && 'form-input-error'}`}
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="form-error">{errors.fullName}</p>}
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
        <label className="form-label">Phone Number:</label>
        <input
          className={`form-input ${errors.phoneNumber && 'form-input-error'}`}
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className="form-error">{errors.phoneNumber}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Applying for Position:</label>
        <select className="form-input" name="position" value={values.position} onChange={handleChange}>
          <option value="">Select Position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      {(values.position === 'Developer' || values.position === 'Designer') && (
        <div className="form-group">
          <label className="form-label">Relevant Experience (years):</label>
          <input
            className={`form-input ${errors.relevantExperience && 'form-input-error'}`}
            type="number"
            name="relevantExperience"
            value={values.relevantExperience}
            onChange={handleChange}
          />
          {errors.relevantExperience && <p className="form-error">{errors.relevantExperience}</p>}
        </div>
      )}
      {values.position === 'Designer' && (
        <div className="form-group">
          <label className="form-label">Portfolio URL:</label>
          <input
            className={`form-input ${errors.portfolioURL && 'form-input-error'}`}
            type="text"
            name="portfolioURL"
            value={values.portfolioURL}
            onChange={handleChange}
          />
          {errors.portfolioURL && <p className="form-error">{errors.portfolioURL}</p>}
        </div>
      )}
      {values.position === 'Manager' && (
        <div className="form-group">
          <label className="form-label">Management Experience:</label>
          <input
            className={`form-input ${errors.managementExperience && 'form-input-error'}`}
            type="text"
            name="managementExperience"
            value={values.managementExperience}
            onChange={handleChange}
          />
          {errors.managementExperience && <p className="form-error">{errors.managementExperience}</p>}
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Additional Skills:</label>
        <div className="form-checkbox-group">
          <label>
            <input
              type="checkbox"
              name="JavaScript"
              checked={values.additionalSkills.JavaScript}
              onChange={handleChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="CSS"
              checked={values.additionalSkills.CSS}
              onChange={handleChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="Python"
              checked={values.additionalSkills.Python}
              onChange={handleChange}
            />
            Python
          </label>
        </div>
        {errors.additionalSkills && <p className="form-error">{errors.additionalSkills}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Preferred Interview Time:</label>
        <input
          className={`form-input ${errors.preferredInterviewTime && 'form-input-error'}`}
          type="datetime-local"
          name="preferredInterviewTime"
          value={values.preferredInterviewTime}
          onChange={handleChange}
        />
        {errors.preferredInterviewTime && <p className="form-error">{errors.preferredInterviewTime}</p>}
      </div>
      <button className="form-button" type="submit">Submit</button>
    </form>
    </>
  );
};

export default JobRegistrationForm;
