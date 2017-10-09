import React, { Component } from 'react';
import './App.css';
import Puzzle from './components/Puzzle';
import { AStar } from './class/AStar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initSetted: false,
      initState: [],
      goalState: [],
      isReady: false
    };
  }

  handleInit = (isGoal, state) => {
    console.log(isGoal);
    console.log(state);
    if(isGoal) {
      this.setState({
        goalState: state,
        isReady: true
      });  
    } else {
      this.setState({
        initSetted: true,
        initState: state
      });
    }

  }

  solveStart = () => {
    let starAI = new AStar(this.state.initState, this.state.goalState, null);
    console.log(starAI);
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.initSetted ? '목표 상태를 입력해주세요!' : '초기 상태를 입력해주세요!'}
        </p>
        <div className="puzzle-group">
          <Puzzle
            isGoal={false}
            initSetted={this.state.initSetted}
            handleInit={this.handleInit}
          />
          { this.state.initSetted ? <Puzzle isGoal={true} handleInit={this.handleInit} /> : undefined }
          <div className="btn-group">
            { this.state.isReady ? <button className="solve" onClick={this.solveStart}>시작</button> : undefined }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
