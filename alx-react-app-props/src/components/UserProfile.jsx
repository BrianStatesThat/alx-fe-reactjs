import React, { useContext } from 'react';
import { UserContext } from './UserContext'; // Import the context

const UserProfile = () => {
  const userData = useContext(UserContext); // Use useContext to access context

  return (
    <div>
      <h2>{userData.name}</h2>
      <p>Age: <span>{userData.age}</span></p>
      <p>Bio: {userData.bio}</p>
    </div>
  );
}

export default UserProfile;