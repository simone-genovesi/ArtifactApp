import React, { useState } from 'react';
import { RegisterDTO } from '../../models/User';
import { register } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [registerData, setRegisterData] = useState<RegisterDTO>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newUser = await register(registerData);
      console.log('Nuovo utente registrato:', newUser);

      // Puoi eseguire azioni aggiuntive dopo la registrazione, come reindirizzare l'utente a una pagina di conferma o login
      navigate('/login');
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Registrazione</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="firstname"
            value={registerData.firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cognome</label>
          <input
            type="text"
            name="lastname"
            value={registerData.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
};

export default Registration;