import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../app/modules/auth/auth-slice';

function LogoutButton() {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    logout();
    dispatch(logoutUser());
  };
  return (
    <Box display="flex" justifyContent="right" padding={2}>
      <Button variant="contained" color="warning" type="submit" onClick={logoutHandler}>
        Logout
      </Button>
    </Box>
  );
}

export default LogoutButton;
