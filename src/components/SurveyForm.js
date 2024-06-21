import React, { useState } from 'react';
import axios from 'axios';
import './SurveyForm.css';

const SurveyForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  };

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.get(`https://api.example.com/questions?topic=${values.surveyTopic}`);
        setAdditionalQuestions(response.data);
        setSummary(values);
      } catch (error) {
        console.error("Error fetching additional questions:", error);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.surveyTopic) errors.surveyTopic = 'Survey Topic is required';

    if (values.surveyTopic === 'Technology') {
      if (!values.favoriteProgrammingLanguage) errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!values.yearsOfExperience || values.yearsOfExperience <= 0) errors.yearsOfExperience = 'Years of Experience is required and must be greater than 0';
    }
    if (values.surveyTopic === 'Health') {
      if (!values.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
      if (!values.dietPreference) errors.dietPreference = 'Diet Preference is required';
    }
    if (values.surveyTopic === 'Education') {
      if (!values.highestQualification) errors.highestQualification = 'Highest Qualification is required';
      if (!values.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
    }
    if (!values.feedback) {
      errors.feedback = 'Feedback is required';
    } else if (values.feedback.length < 50) {
      errors.feedback = 'Feedback must be at least 50 characters';
    }
    return errors;
  };

  return (
    <div>
     <h1>Survey Form.js</h1>
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
        <label className="form-label">Survey Topic:</label>
        <select
          className={`form-input ${errors.surveyTopic && 'form-input-error'}`}
          name="surveyTopic"
          value={values.surveyTopic}
          onChange={handleChange}
        >
          <option value="">Select Topic</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <p className="form-error">{errors.surveyTopic}</p>}
      </div>
      {values.surveyTopic === 'Technology' && (
        <>
          <div className="form-group">
            <label className="form-label">Favorite Programming Language:</label>
            <select
              className={`form-input ${errors.favoriteProgrammingLanguage && 'form-input-error'}`}
              name="favoriteProgrammingLanguage"
              value={values.favoriteProgrammingLanguage}
              onChange={handleChange}
            >
              <option value="">Select Language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteProgrammingLanguage && <p className="form-error">{errors.favoriteProgrammingLanguage}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Years of Experience:</label>
            <input
              className={`form-input ${errors.yearsOfExperience && 'form-input-error'}`}
              type="number"
              name="yearsOfExperience"
              value={values.yearsOfExperience}
              onChange={handleChange}
            />
            {errors.yearsOfExperience && <p className="form-error">{errors.yearsOfExperience}</p>}
          </div>
        </>
      )}
      {values.surveyTopic === 'Health' && (
        <>
          <div className="form-group">
            <label className="form-label">Exercise Frequency:</label>
            <select
              className={`form-input ${errors.exerciseFrequency && 'form-input-error'}`}
              name="exerciseFrequency"
              value={values.exerciseFrequency}
              onChange={handleChange}
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p className="form-error">{errors.exerciseFrequency}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Diet Preference:</label>
            <select
              className={`form-input ${errors.dietPreference && 'form-input-error'}`}
              name="dietPreference"
              value={values.dietPreference}
              onChange={handleChange}
            >
              <option value="">Select Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p className="form-error">{errors.dietPreference}</p>}
          </div>
        </>
      )}
      {values.surveyTopic === 'Education' && (
        <>
          <div className="form-group">
            <label className="form-label">Highest Qualification:</label>
            <select
              className={`form-input ${errors.highestQualification && 'form-input-error'}`}
              name="highestQualification"
              value={values.highestQualification}
              onChange={handleChange}
            >
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <p className="form-error">{errors.highestQualification}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Field of Study:</label>
            <input
              className={`form-input ${errors.fieldOfStudy && 'form-input-error'}`}
              type="text"
              name="fieldOfStudy"
              value={values.fieldOfStudy}
              onChange={handleChange}
            />
            {errors.fieldOfStudy && <p className="form-error">{errors.fieldOfStudy}</p>}
          </div>
        </>
      )}
      <div className="form-group">
        <label className="form-label">Feedback:</label>
        <textarea
          className={`form-input ${errors.feedback && 'form-input-error'}`}
          name="feedback"
          value={values.feedback}
          onChange={handleChange}
        ></textarea>
        {errors.feedback && <p className="form-error">{errors.feedback}</p>}
      </div>
      <button className="form-button" type="submit">Submit</button>
    </form>
    {summary && (
      <div className="summary">
        <h2>Form Summary</h2>
        <pre>{JSON.stringify(summary, null, 2)}</pre>
        {additionalQuestions.length > 0 && (
          <div className="additional-questions">
            <h3>Additional Questions</h3>
            <ul>
              {additionalQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
  );
};

export default SurveyForm;
