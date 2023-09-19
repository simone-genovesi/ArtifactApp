import React from 'react';
import { RegisterDTO } from '../../models/User';
import { register } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
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

const Registration = () => {

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = e.currentTarget as HTMLFormElement;

      const newUser: RegisterDTO = {
        firstname: form.firstName.value,
        lastname: form.lastName.value,
        email: form.email.value,
        password: form.password.value,
      };
      const registeredUser = await register(newUser);
      console.log('Nuovo utente registrato: ', registeredUser);

      // Puoi eseguire azioni aggiuntive dopo la registrazione, come reindirizzare l'utente a una pagina di conferma o login
      navigate('/login');
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
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
          Registrazione
        </Typography>
        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Cognome"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
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
            Registrati
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Hai già un account? Effettua l'accesso
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
);
};

export default Registration;