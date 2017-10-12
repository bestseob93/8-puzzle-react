import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Puzzle from './components/Puzzle';
import PuzzleGoal from './components/PuzzleGoal';
import { Node, AStar } from './class/AStar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initSetted: false,
      initState: [],
      goalState: [],
      isReady: false,
      emptyPosition: {
        init: [],
        goal: []
      },
      result: null,
      divArr: [],
    };
  }

  handleInit = (isGoal, state, emptyPosition, divArr) => {
    if(isGoal) {
      this.setState({
        goalState: state,
        isReady: true,
        emptyPosition: {
          init: this.state.emptyPosition.init,
          goal: emptyPosition
        }
      });
    } else {
      this.setState({
        initSetted: true,
        initState: state,
        emptyPosition: {
          init: emptyPosition,
          goal: this.state.emptyPosition.goal
        },
        divArr
      });
    }

  }

  solveStart = () => {
    console.log(this.state);
    const init = new Node(0, this.state.initState, this.state.emptyPosition.init[0], this.state.emptyPosition.init[1], 0);
    const goal = new Node(0, this.state.goalState, this.state.emptyPosition.goal[0], this.state.emptyPosition.goal[1], 0);
    
    const starAI = new AStar(init, goal, 0);
    // To measure time taken by the algorithm
    let startTime = new Date();
    // Execute AStar
    let result = starAI.execute(this.state.divArr);
    // To measure time taken by the algorithm
    let endTime = new Date();
    alert('Completed in: ' + (endTime - startTime) + ' milliseconds');
    console.log(result);
    this.setState({
      result
    });
  }

  render() {

    console.log('movePosition');
    console.log(this.state.result);
    const { result } = this.state;
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
            resultPath={result !== null ? result !== undefined ? result.path : '' : ''}
            isReady={this.state.isReady}
          />
          { this.state.initSetted ? <PuzzleGoal isGoal={true} handleInit={this.handleInit} /> : undefined }
          <div className="btn-group">
            { this.state.isReady ? <button className="solve" onClick={this.solveStart}>시작</button> : undefined }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
