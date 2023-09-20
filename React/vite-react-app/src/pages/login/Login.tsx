import { LoginDTO, Token, User } from '../../models/User';
import { getUserData, login } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Login = () => {
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const form = e.currentTarget as HTMLFormElement;

      const loginForm : LoginDTO = {
        email: form.email.value,
        password: form.password.value,
      };

      const token: Token = await login(loginForm);

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

  const theme = createTheme({
    palette: {
      background: {
        default: '#d7ebf6', // Cambia il colore di sfondo predefinito
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="registration" variant="body2">
                  Non hai un account? Createne uno
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </ThemeProvider>
    );
}
export default Login;