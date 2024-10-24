import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    place: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Decode JWT token to get the userId
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken._id;
    }
    return null;
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Invalid token or user not logged in");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${BaseUrl}/api/user/${userId}`);
      if (response.status === 200) {
        setUserData(response.data);
        setLoading(false);
      }
    } catch (error) {
      setError("Error fetching user profile.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Profile</h2>
      <div style={styles.profileBox}>
        <div style={styles.profileField}>
          <strong>Name:</strong> <span>{userData.name}</span>
        </div>
        <div style={styles.profileField}>
          <strong>Email:</strong> <span>{userData.email}</span>
        </div>
        <div style={styles.profileField}>
          <strong>Mobile:</strong> <span>{userData.mobile}</span>
        </div>
        <div style={styles.profileField}>
          <strong>Place:</strong> <span>{userData.place}</span>
        </div>
      </div>
    </div>
  );
};

// Styling for the profile page
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  profileBox: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  profileField: {
    fontSize: "16px",
    color: "#555",
  },
};

export default UserProfile;
