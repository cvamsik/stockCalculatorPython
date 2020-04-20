import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import GetStockForm from './Components/GetStockForm/GetStockForm';
import TickerInputPage from './Components/TickerInputPage/TickerInputPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/stockCalculator' component={GetStockForm} />
        <Route exact path='/' component={TickerInputPage} />

      </div>
    );
  }
}

export default App;
