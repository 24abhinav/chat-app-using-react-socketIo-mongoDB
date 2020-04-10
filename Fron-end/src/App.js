import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Cookies from 'js-cookie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }
  
  componentDidMount() {
    this.setState({
      isLogin: Cookies.get('S') ? true : false
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.isLogin ?
          <h1>Logged in</h1>
          :
          <Login />
        }
      </div>
    );
  }
}

export default App;
