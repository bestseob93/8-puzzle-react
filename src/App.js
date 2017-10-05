import React, { Component } from 'react';
import './App.css';
import Puzzle from './components/Puzzle';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          초기 상태를 입력해주세요!
        </p>
        <Puzzle />
      </div>
    );
  }
}

export default App;
