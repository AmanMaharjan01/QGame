import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/modules/store';

const domain = process.env.REACT_APP_AUTH0_DOMAIN || 'dev-9yq39l2z.us.auth0.com';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || 'qg8Ideu3jMPO27YMrOKEskiXYnY17eCG';

ReactDOM.render(
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);
