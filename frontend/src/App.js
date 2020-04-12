import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import GetStockForm from './Components/GetStockForm/GetStockForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={GetStockForm} />
      </div>
    );
  }
}

export default App;
