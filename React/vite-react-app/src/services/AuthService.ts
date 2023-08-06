import axios from 'axios';
import { LoginDTO, Token, User } from '../models/User';
import { BASE_URL, AUTH_ENDPOINT, OTHER_ENDPOINT } from '../apiConfig';

export const login = async (loginData: LoginDTO): Promise<Token> => {
  const response = await axios.post<Token>(
    `${BASE_URL}${AUTH_ENDPOINT}/authenticate`,
    loginData
  );
  const token: Token = response.data;
  return token;
};

export const getUserData = async (token: string): Promise<User> => {
  const response = await axios.get<User>(`${BASE_URL}${OTHER_ENDPOINT}/get-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};