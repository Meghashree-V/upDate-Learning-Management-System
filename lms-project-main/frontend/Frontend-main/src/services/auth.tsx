// src/services/auth.ts
import axios from "axios";

// Base API URL (change if needed)
const API_URL = "http://localhost:5000/api/auth";

// Types for login and register responses
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    userType: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    qualification: string;
    interests: string;
    userType: string;
  };
}

// Signup function
export const signup = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  qualification: string;
  interests: string;
  userType: string;
}): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(`${API_URL}/register`, data);
  return response.data;
};

// Login function
export const login = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
  return response.data;
};
