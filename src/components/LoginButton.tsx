import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Box display="flex" justifyContent="right" padding={2}>
      <Button variant="contained" type="submit" onClick={() => loginWithRedirect()}>
        Login
      </Button>
    </Box>
  );
}

export default LoginButton;
