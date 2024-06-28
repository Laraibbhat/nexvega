import React, { useState } from "react";
import "./CandidateForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CandidateForm = ({ candidate, onSave }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const candidateData = location.state;
  const initialFormData = candidateData || {
    name: "",
    skills: "",
    yearsOfExperience: "",
    location: "",
    videoInterviewResults: "",
    codingResults: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);

  console.log("The data is: " + JSON.stringify(formData));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormTouched({ ...formTouched, [name]: true });
    validateField(name, value, formErrors);
  };

  const validateField = (name, value, formErrorList) => {
    let newErrors = { ...formErrorList };
    if (String(value)?.trim() === "") {
      newErrors[name] = "This field is required";
    } else {
      delete newErrors[name];
    }
    setFormErrors(newErrors);

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    const allErrors = {};
    let formErrorList = formErrors;
    Object.keys(formData).forEach((key) => {
      const formError = validateField(key, formData[key], formErrorList);
      formErrorList = formError;
      if (formError[key]) {
        allErrors[key] = formError[key];
      }
    });
    setFormErrors(formErrorList);
    if (Object.keys(allErrors).length > 0) {
      console.log("Form has errors. Cannot submit.");
      return;
    }
    try {
      if (location.state) {
        await axios.put(
          `http://localhost:5000/candidates/${location.state._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/candidates", formData);
      }
      navigate("/");
      onSave();
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
  };

  return (
    <div className="root">
      <form onSubmit={handleSubmit} className="candidate-form">
        <h1 className="form-heading">Candidate Information</h1>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          {(submitClicked || formTouched.name) && formErrors.name && (
            <p className="errorMessage">{formErrors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="skills" className="form-label">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="form-input"
          />
          {(submitClicked || formTouched.skills) && formErrors.skills && (
            <p className="errorMessage">{formErrors.skills}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="yearsOfExperience" className="form-label">
            Years of Experience
          </label>
          <input
            type="text"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="form-input"
          />
          {(submitClicked || formTouched.yearsOfExperience) &&
            formErrors.yearsOfExperience && (
              <p className="errorMessage">{formErrors.yearsOfExperience}</p>
            )}
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
          />
          {(submitClicked || formTouched.location) && formErrors.location && (
            <p className="errorMessage">{formErrors.location}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="codingResults" className="form-label">
            Coding Results
          </label>
          <select
            id="codingResults"
            name="codingResults"
            value={formData.codingResults}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Result</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
          {(submitClicked || formTouched.codingResults) &&
            formErrors.codingResults && (
              <p className="errorMessage">{formErrors.codingResults}</p>
            )}
        </div>

        <div className="form-group">
          <label htmlFor="videoInterviewResults" className="form-label">
            Video Interview Result
          </label>
          <select
            id="videoInterviewResults"
            name="videoInterviewResults"
            value={formData.videoInterviewResults}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Result</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
          {(submitClicked || formTouched.videoInterviewResults) &&
            formErrors.videoInterviewResults && (
              <p className="errorMessage">{formErrors.videoInterviewResults}</p>
            )}
        </div>

        <button type="submit" className="form-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
