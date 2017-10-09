import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

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
            valueSetted: true
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.value_8 !== this.state.value_8) {
            this.setState({
                valueSetted: false
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
        const initState = [[this.state.value_0, this.state.value_1, this.state.value_2], [this.state.value_3, this.state.value_4, this.state.value_5], [this.state.value_6, this.state.value_7, this.state.value_8]];
        this.props.handleInit(this.props.isGoal, initState);
    }

    handleGoalBtnPress = () => {
        const goalState = [[this.state.value_0, this.state.value_1, this.state.value_2], [this.state.value_3, this.state.value_4, this.state.value_5], [this.state.value_6, this.state.value_7, this.state.value_8]];
        this.props.handleInit(this.props.isGoal, goalState);     
    }

    render() {
        return (
            <div className="puzzle-pannel">
                <div className={this.props.isGoal ? "grid-goal" : "grid"}>
                    <div className="row">
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="0,0">
                            <input
                                type="number"
                                name="value_0"
                                onChange={this.handleChange}
                                value={this.state.value_0}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="0,1">
                            <input
                                type="number"
                                name="value_1"
                                onChange={this.handleChange}
                                value={this.state.value_1}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="0,2">
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
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="1,0">
                            <input
                                type="number"
                                name="value_3"
                                onChange={this.handleChange}
                                value={this.state.value_3}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="1,1">
                            <input
                                type="number"
                                name="value_4"
                                onChange={this.handleChange}
                                value={this.state.value_4}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="1,2">
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
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="2,0">
                            <input
                                type="number"
                                name="value_6"
                                onChange={this.handleChange}
                                value={this.state.value_6}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="2,1">
                            <input
                                type="number"
                                name="value_7"
                                onChange={this.handleChange}
                                value={this.state.value_7}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className={this.props.isGoal ? "cell-goal" : "cell"} data-pos="2,2">
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
            </div>
        );
    }
}

export default Puzzle;
