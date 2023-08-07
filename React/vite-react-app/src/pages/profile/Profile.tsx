import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../models/User';
import { getUserById, getCurrentUser } from '../../services/AuthService';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (!id) {
      // ID non fornito nell'URL, mostra il profilo dell'utente corrente
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUserData(currentUser);
      }
    } else {
      // ID fornito nell'URL, recupera il profilo dell'utente con quell'ID
      getUserById(id)
        .then((user) => setUserData(user))
        .catch((error) => console.error('Errore durante il recupero dei dati utente:', error));
    }
  }, [id]);

  if (!userData) {
    // Mostra un messaggio di caricamento o uno spinner finché i dati dell'utente non sono disponibili
    return <p>Caricamento...</p>;
  }

  return (
    <div>
      <h2>Profilo</h2>
      <p>Nome: {userData.firstname}</p>
      <p>Cognome: {userData.lastname}</p>
      <p>Email: {userData.email}</p>
      {/* Altre informazioni sul profilo dell'utente */}
    </div>
  );
};

export default Profile;