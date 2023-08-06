import React, { useState } from 'react';
import { LoginDTO, Token, User } from '../../models/User';
import { getUserData, login } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState<LoginDTO>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token: Token = await login(loginData);
      console.log('Token JWT:', token);

     // Salva il token nel local storage o nei cookie.
    localStorage.setItem('token', token.token);
    

    // Recupera i dati dell'utente utilizzando il token
    let user: User;
    try {
      user = await getUserData(token.token);
      console.log('Dati utente:', user);

      // Creare un nuovo oggetto con le informazioni desiderate dell'utente
      const userToSave = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        // Puoi aggiungere altre proprietà se necessario
      };

      localStorage.setItem('user', JSON.stringify(userToSave));
    } catch (error) {
      console.error('Errore durante il recupero dei dati utente:', error);
      // Puoi gestire l'errore qui, ad esempio mostrando un messaggio all'utente o facendo un reindirizzamento
    }

     // Reindirizza l'utente alla pagina home dopo il login
    navigate('/');
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Accedi</button>
      </form>
    </div>
  );
};

export default Login;