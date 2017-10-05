import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Puzzle extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        initState: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            value_0: '',
            value_1: '',
            value_2: '',
            value_3: '',
            value_4: '',
            value_5: '',
            value_6: '',
            value_7: '',
            value_8: ''
        };
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    render() {
        return (
            <div className="puzzle-pannel">
                <div className="grid initial-state">
                    <div className="row">
                        <div className="cell" data-pos="0,0">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_0"
                                onChange={this.handleChange}
                                value={this.state.value_0}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className="cell" data-pos="0,1">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_1"
                                onChange={this.handleChange}
                                value={this.state.value_1}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className="cell" data-pos="0,2">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_2"
                                onChange={this.handleChange}
                                value={this.state.value_2}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell" data-pos="1,0">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_3"
                                onChange={this.handleChange}
                                value={this.state.value_3}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className="cell" data-pos="1,1">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_4"
                                onChange={this.handleChange}
                                value={this.state.value_4}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className="cell" data-pos="1,2">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_5"
                                onChange={this.handleChange}
                                value={this.state.value_5}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell" data-pos="2,0">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_6"
                                onChange={this.handleChange}
                                value={this.state.value_6}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className="cell" data-pos="2,1">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_7"
                                onChange={this.handleChange}
                                value={this.state.value_7}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className="cell" data-pos="2,2">
                            <input
                                type="text"
                                placeholder="0"
                                name="value_8"
                                onChange={this.handleChange}
                                value={this.state.value_8}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Puzzle;
