//api.js

import axios from 'axios';

// Function to get user profile data
export const getUserProfile = async (email, token) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/profile/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to create or update user profile data
export const createUserProfile = async (email, profileData, token) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/profile/${email}`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to upload profile picture
export const uploadProfilePicture = async (userId, file, token) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/profile/${userId}/picture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload profile picture');
    }

    return response.json();
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

