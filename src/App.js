import React, { Component } from 'react';
import logo from './logo.svg';
import Repo from './components/Repo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Repo/>
       </div>
    );
  }
}

export default App;
