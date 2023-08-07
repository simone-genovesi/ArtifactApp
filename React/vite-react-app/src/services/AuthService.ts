import axios from 'axios';
import { LoginDTO, RegisterDTO, Token, User } from '../models/User';
import { BASE_URL, AUTH_ENDPOINT, OTHER_ENDPOINT } from '../apiConfig';

export const login = async (loginData: LoginDTO): Promise<Token> => {
  const response = await axios.post<Token>(
    `${BASE_URL}${AUTH_ENDPOINT}/authenticate`,
    loginData
  );
  const token: Token = response.data;
  return token;
};

export const register = async (registerData: RegisterDTO): Promise<User> => {
  const response = await axios.post<User>(
    `${BASE_URL}${AUTH_ENDPOINT}/register`,
    registerData
  );
  return response.data;
};

export const getUserData = async (token: string): Promise<User> => {
  const response = await axios.get<User>(`${BASE_URL}${OTHER_ENDPOINT}/get-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

export const getCurrentUser = (): User | null => {
  const userJsonString = localStorage.getItem('user');
  if (!userJsonString) {
    return null;
  }
  const user = JSON.parse(userJsonString) as User;
  return user;
};

export const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem('token');
  return token;
};

export const getUserById = async (userId: string): Promise<User> => {
  const response = await axios.get<User>(`${BASE_URL}${OTHER_ENDPOINT}/get-profile/${userId}`);
  return response.data;
};