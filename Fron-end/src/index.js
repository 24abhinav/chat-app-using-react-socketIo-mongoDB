import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

// Components
import LandingPage from './components/landingPage';
import Cookies from 'js-cookie';

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
      <Switch>
        <Route exact path = "/" component = {App} />
        <ProtectedRoute path="/chat"  component={LandingPage} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
