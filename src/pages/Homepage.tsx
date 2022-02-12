import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import useAuth from '../hooks/useAuth';
import { storeUser } from '../app/modules/auth/auth-slice';

function Homepage() {
  const { loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useAuth();

  useEffect(() => {
    if (user) {
      dispatch(storeUser(user));
    }
  }, [user]);

  const goToQuiz = () => navigate('/quiz');

  const toggleLogin = () => (loggedUser ? goToQuiz() : loginWithRedirect());
  return (
    <Box>
      <Box>
        {loggedUser ? <LogoutButton /> : <LoginButton />}
        <Box textAlign="center" padding={10} display="flex" flexDirection="column" gap={5}>
          <Typography variant="h4">Welcome to the Quiz App</Typography>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            {loggedUser && <img src={loggedUser?.picture} width="100" height="100" alt="profile" />}
            {loggedUser?.given_name}
          </Box>
          <Box>
            <Button variant="contained" color="success" onClick={toggleLogin}>
              {loggedUser ? 'Lets Play' : 'Get Started'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Homepage;
