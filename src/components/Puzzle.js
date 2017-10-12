import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import $ from 'jquery';

class Puzzle extends Component {
    static propTypes = {
        handleInit: PropTypes.func,
        initSetted: PropTypes.bool,
        isGoal: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            value_0: 0,
            value_1: 0,
            value_2: 0,
            value_3: 0,
            value_4: 0,
            value_5: 0,
            value_6: 0,
            value_7: 0,
            value_8: 0,
            valueSetted: true,
            leftValue: 0,
            divArr: [],
            divRef: null,
            movePosition: ''
        };

        this.emptytilePosCol = 0;
        this.emptytilePosRow = 0;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.value_7 !== this.state.value_7) {
            this.setState({
                valueSetted: false,
                divArr: [this.div_0, this.div_1, this.div_2, this.div_3, this.div_4, this.div_5, this.div_6, this.div_7, this.div_8]
            });
        }
        // 마지막 값 변했는지 비교하여 버튼 활성화 여부 결정
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    handleInitBtnPress = () => {
        const initState = [[parseInt(this.state.value_0), parseInt(this.state.value_1), parseInt(this.state.value_2)], [parseInt(this.state.value_3), parseInt(this.state.value_4), parseInt(this.state.value_5)], [parseInt(this.state.value_6), parseInt(this.state.value_7), parseInt(this.state.value_8)]];
        let divArr = this.state.divArr;
        let emptyPosition = [];
        for(let i=0; i<initState.length; i++) {
            for(let j=0; j<initState[i].length; j++) {
                if(initState[i][j] === 0) {
                    emptyPosition = [i, j];
                    this.emptytilePosRow = i;
                    this.emptytilePosCol = j;
                    this.setState({
                        emptytilePosRow: i,
                        emptytilePosCol: j
                    });
                    for(let k=0; k<divArr.length; k++) {
                        if(divArr[k].dataset.pos === i + "," + j) {
                            divArr[k].id = "empty";
                        }
                    }
                }
            }
        }
        
        this.props.handleInit(this.props.isGoal, initState, emptyPosition, divArr);
    }

    handleGoalBtnPress = () => {
        const goalState = [[parseInt(this.state.value_0), parseInt(this.state.value_1), parseInt(this.state.value_2)], [parseInt(this.state.value_3), parseInt(this.state.value_4), parseInt(this.state.value_5)], [parseInt(this.state.value_6), parseInt(this.state.value_7), parseInt(this.state.value_8)]];
        let emptyPosition = [];
        for(let i=0; i<goalState.length; i++) {
            for(let j=0; j<goalState[i].length; j++) {
                if(goalState[i][j] === 0) {
                    emptyPosition = [i, j];
                }
            }
        }
        this.props.handleInit(this.props.isGoal, goalState, emptyPosition, null);    
    }

    moveTile = (divRef, move) => {
        let pos = $(divRef).attr('data-pos');
        if(pos !== undefined) {
            let posRow = parseInt(pos.split(',')[0]);
            let posCol = parseInt(pos.split(',')[1]);


            const cellDisplacement = 100;
            // Move Up
            if (posRow + 1 === this.emptytilePosRow && posCol === this.emptytilePosCol) {
                $(divRef).animate({
                    'top' : "+=" + cellDisplacement //moves up
                });
        
                $('#empty.cell').animate({
                    'top' : "-=" + cellDisplacement //moves down
                });
                
                this.emptytilePosRow -= 1;
                $(divRef).attr('data-pos',(posRow+1) + "," + posCol);
            }
            
            // Move Down
            if (posRow - 1 === this.emptytilePosRow && posCol === this.emptytilePosCol) {
                $(divRef).animate({
                    'top' : "-=" + cellDisplacement //moves down
                });
        
                $('#empty.cell').animate({
                    'top' : "+=" + cellDisplacement //moves up
                });
                
                this.emptytilePosRow += 1;
                $(divRef).attr('data-pos',(posRow-1) + "," + posCol);
            }
            
            // Move Left
            if (posRow === this.emptytilePosRow && posCol + 1 === this.emptytilePosCol) {
                $(divRef).animate({
                    'right' : "-=" + cellDisplacement //moves right
                });
        
                $('#empty.cell').animate({
                    'right' : "+=" + cellDisplacement //moves left
                });
                
                this.emptytilePosCol -= 1;
                $(divRef).attr('data-pos',posRow + "," + (posCol+1));
            }
            
            // Move Right
            if (posRow === this.emptytilePosRow && posCol - 1 === this.emptytilePosCol) {
                $(divRef).animate({
                    'right' : "+=" + cellDisplacement //moves left
                });
        
                $('#empty.cell').animate({
                    'right' : "-=" + cellDisplacement //moves right
                });
                
                this.emptytilePosCol += 1;
                $(divRef).attr('data-pos',posRow + "," + (posCol-1));
            }
            
            // Update empty position
            $('#empty.cell').attr('data-pos',this.emptytilePosRow + "," + this.emptytilePosCol);
        }
    }

    showSolution = () => {
        let self = this;
        const resultPath = this.props.resultPath;
        const arrLength = resultPath.length;
        let move = '';
    
        for(let i=0; i<arrLength; i++) {
            setTimeout(function timer() {
                switch(resultPath[i]) {
                    case "R":
                      move =  (self.emptytilePosRow).toString() + ',' + (self.emptytilePosCol + 1).toString();
                      break;
                    case "L":
                      move =  (self.emptytilePosRow).toString() + ',' + (self.emptytilePosCol - 1).toString();
                      break;
                    case "U":
                      move =  (self.emptytilePosRow - 1).toString() + ',' + (self.emptytilePosCol).toString();
                      break;
                    case "D":
                      move =  (self.emptytilePosRow + 1).toString() + ',' + (self.emptytilePosCol).toString();
                      break;
                  }
                  console.log(move);
                  self.moveTile($("div.cell[data-pos='" + move + "']")[0], move);
            }, i*400)

    
          
        }
        // for(let j=0; j<divArr.length; j++) {
        //   console.log('divArr');
        //   console.log(divArr[j]);
        //   console.log(divArr[j].dataset.pos + '||' + move);
        //   if(divArr[j].dataset.pos === move) {
        //     console.log('for loop');
    
        //   }
        // }
      }

    render() {

        return (
            <div className="puzzle-pannel">
                <div className="grid">
                    <div className="row">
                        <div ref={(div) => { this.div_0 = div; }} className="cell" data-pos="0,0">
                            <input
                                type="number"
                                name="value_0"
                                onChange={this.handleChange}
                                value={this.state.value_0}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div ref={(div) => { this.div_1 = div }} className="cell" data-pos="0,1">
                            <input
                                type="number"
                                name="value_1"
                                onChange={this.handleChange}
                                value={this.state.value_1}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div ref={(div) => { this.div_2 = div; }} className="cell" data-pos="0,2">
                            <input
                                type="number"
                                name="value_2"
                                onChange={this.handleChange}
                                value={this.state.value_2}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div ref={(div) => { this.div_3 = div; }} className="cell" data-pos="1,0">
                            <input
                                type="number"
                                name="value_3"
                                onChange={this.handleChange}
                                value={this.state.value_3}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div ref={(div) => { this.div_4 = div; }} className="cell" data-pos="1,1">
                            <input
                                type="number"
                                name="value_4"
                                onChange={this.handleChange}
                                value={this.state.value_4}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div ref={(div) => { this.div_5 = div; }} className="cell" data-pos="1,2">
                            <input
                                type="number"
                                name="value_5"
                                onChange={this.handleChange}
                                value={this.state.value_5}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div ref={(div) => { this.div_6 = div; }} className="cell" data-pos="2,0">
                            <input
                                type="number"
                                name="value_6"
                                onChange={this.handleChange}
                                value={this.state.value_6}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div ref={(div) => { this.div_7 = div; }} className="cell" data-pos="2,1">
                            <input
                                type="number"
                                name="value_7"
                                onChange={this.handleChange}
                                value={this.state.value_7}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div ref={(div) => { this.div_8 = div; }} className="cell" data-pos="2,2">
                            <input
                                type="number"
                                name="value_8"
                                onChange={this.handleChange}
                                value={this.state.value_8}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                </div>
                {
                    this.props.initSetted ? undefined :
                    <button
                        type="button"
                        style={{marginTop: 50}}
                        onClick={ this.props.isGoal ? this.handleGoalBtnPress : this.handleInitBtnPress }
                        disabled={this.state.valueSetted}
                    >
                    셋팅 완료
                    </button>
                }
                { this.props.isReady ? <button className="solution" onClick={this.showSolution}>결과보기</button> : undefined }
            </div>
        );
    }
}

export default Puzzle;
