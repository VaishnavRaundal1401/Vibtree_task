import React, { useState } from "react";
import './Auth.scss';
import axios from "axios";

const Auth = () => {

    //Object to store the user details (initially empty)
    const [formData, setFormData] = useState({
        name:"",
        mobileNumber:"",
        dateOfBirth:"",
        emailId:"",
        password:"",
    });

    //errors object to store the error messages of all the fields
    const [errors, setErrors] = useState({});
    //to disable the submit button if all the fields are not filled properly
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    let isValidMobileNumber = (mobileNumber)=>{
        let lengthOfMobileNumber = mobileNumber.length;
        if( lengthOfMobileNumber < 10 || lengthOfMobileNumber>10 )return false;
        return true;
    }

    //handle the validation for all the fields
    const validateForm = () => {
        const newErrors = {};
        if(!formData.name) newErrors.name = "Name is required";
        // if(!formData.number || !/^\d{9}$/.test(formData.number)) newErrors.number = "Invalid phone number";
        if(!isValidMobileNumber(formData.mobileNumber)) newErrors.mobileNumber = "Invalid phone number";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
        if (!formData.emailId || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.emailId)) newErrors.emailId = "Invalid email";
        if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors); // the the errors in the errors object
        setIsSubmitEnabled(Object.keys(newErrors).length === 0); // if newErrors object is empty then it indicates their are no errors 
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateForm();
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        if (isSubmitEnabled) {
            try {
                const response = await axios.post("http://localhost:8000/api/v1/user", formData);
                if(response.data.status === "success") {
                    alert("Form Submitted Successfully!!");
                }
            } catch (error) {
                console.error("Error submitting the form:", error);
            }
        }
      };

  return (
    <div className='authContainer'>
        <form onSubmit={handleSubmit} className="form">
            <h1>Sign Up</h1>
            <div className="nameComponent">
                <label>Name:</label>
                <input type="text" name="name" onChange={handleChange} />
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div className="numberComponent">
                <label>Mobile Number:</label>
                <input type="text" name="mobileNumber" onChange={handleChange} />
                {errors.mobileNumber && <span>{errors.mobileNumber}</span>}
            </div>

            <div className="dobComponent">
                <label>Date Of Birth:</label>
                <input type="date" name="dateOfBirth" onChange={handleChange} />
                {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
            </div>

            <div className="emailComponent">
                <label>Email:</label>
                <input type="email" name="emailId" onChange={handleChange} />
                {errors.emailId && <span>{errors.emailId}</span>}
            </div>

            <div className="passwordComponent">
                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <button type="submit" disabled={!isSubmitEnabled}>Submit</button>
        </form>
      
    </div>
  )
}

export default Auth
