import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./UserList.scss";

const UserList = () => {

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/user/");
            if(response.data.status === "success") {
                setProfiles(response.data.data.profiles);
            }
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };

    fetchProfiles();
}, []);


  return (
    <div className='container my-5 UserDetails'>
    {profiles.map((profile, index) => (
        <div className="useCards" key={index}>
            <div className="card">
                <div className="card-body">
                  <img src="./Images/gray.png" alt="..." />
                    <h5 className="card-title">{profile.name}</h5>
                    <p className="card-text">Email: {profile.emailId}</p>
                    <p className="card-text">Mobile: {profile.mobileNumber}</p>
                    <p className="card-text">DOB: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    ))}
</div>
  )
}

export default UserList
