import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

// Components
import LandingPage from './components/landingPage';
import UserProfile from './components/userProfile';

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const loginStatus = Cookies.get('S'); // S is for access token
  return (
    <Route
      path={path}
      {...rest}
      render = { props => {
        return loginStatus ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

const routing = (
  <Router>
    <div>
      {/* <Switch> */}
        <Route path = "/" component = {App} />
        <ProtectedRoute path="/chat"  component={LandingPage} />
        <ProtectedRoute path="/profile"  component={UserProfile} />
      {/* </Switch> */}
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
