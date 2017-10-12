import PriorityQueue from 'js-priority-queue';
import HashSet from '../utils/HashSet';

Array.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this));
}

Array.prototype.contains = function(x) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === x) {
            return true;
        }
    }
    
    return false;
}

export function Node(value, state, emptyRow, emptyCol, depth) {
    this.value = value;
    this.state = state;
    this.emptyCol = emptyCol;
    this.emptyRow = emptyRow;
    this.depth = depth;
    this.strRepresentation = "";
    this.path = "";
    
    // 상태 표시
    for (let i = 0; i < state.length; i++) {
        // 정사각형 체크
        if (state[i].length !== state.length) {
            alert('행 열 값이 다릅니다');
            return false;
        }
        for (let j = 0; j < state[i].length; j++) {
            this.strRepresentation += state[i][j] + ",";
        }
    }

    this.size = this.state.length;
}

export class AStar {
    constructor(initial, goal, empty) {
        this.initial = initial;
        this.goal = goal;
        this.empty = empty;
        this.queue = new PriorityQueue({ comparator: (a, b) => { 
            if (a.value > b.value)
                return 1;
            if (a.value < b.value)
                return -1;
            return 0;
        }});
        this.queue.queue(initial);
        this.visited = new HashSet();
    }

    heuristic = (node) => {
        return this.manhattanDistance(node) + this.manhattanDistance(node);
    }

    misplacedTiles = (node) => {
        let result = 0;
        for(let i = 0; i < node.state.length; i++) {
            for(let j = 0; j < node.state[i].length; j++) {
                if (node.state[i][j] !== this.goal.state[i][j] && node.state[i][j] !== this.empty) {
                    result++;
                }
            }
        }
        return result;
    }

    manhattanDistance = (node) => {
        let result = 0;
        for(let i = 0; i < node.state.length; i++) {
            for(let j = 0; j < node.state[i].length; j++) {
                let elem = node.state[i][j];
                let found = false;
                for(let h = 0; h < this.goal.state.length; h++) {
                    for(let k = 0; k < this.goal.state[h].length; k++) {
                        if (this.goal.state[h][k] === elem) {
                            result += Math.abs(h - i) + Math.abs(j - k);
                            found = true;
                            break;
                        }
                    }
                    if(found) break;
                }
            }
        }
        return result;
    }

    findConflicts = (state, i, dimension) => {
        let result = 0;
        let tilesRelated = [];

        // Loop foreach pair of elements in the row/column
        for(let h = 0; h < state.length - 1 && !tilesRelated.contains(h); h++) {
            for(let k = h + 1; k < state.length && !tilesRelated.contains(h); k++) {
                let moves = dimension === 1 
                    ? this.inConflict(i, state[i][h], state[i][k], h, k, dimension) 
                    : this.inConflict(i, state[h][i], state[k][i], h, k, dimension);
                    
                if (moves === 0) continue;

                result += 2;
                tilesRelated.push([h, k ]);
                break;
            }
        }

        return result;
    }

    inConflict = (index, a, b, indexA, indexB, dimension) => {
        let indexGoalA = -1;
        let indexGoalB = -1;

        for(let c = 0; c < this.goal.state.length; c++) {
            if (dimension === 1 && this.goal.state[index][c] === a) {
                indexGoalA = c;
            } else if (dimension === 1 && this.goal.state[index][c] === b) {
                indexGoalB = c;
            } else if (dimension === 0 && this.goal.state[c][index] === a) {
                indexGoalA = c;
            } else if (dimension === 0 && this.goal.state[c][index] === b) {
                indexGoalB = c;
            }
        }

        return (indexGoalA >= 0 && indexGoalB >= 0) && 
               ((indexA < indexB && indexGoalA > indexGoalB) ||
               (indexA > indexB && indexGoalA < indexGoalB))
                       ? 2
                       : 0;
    }
    execute = () => {
        // 현재 상태 닫힌 노드에 추가
		this.visited.add(this.initial.strRepresentation);
        
        // 큐 실행
		while (this.queue.length > 0) {
		    let current = this.queue.dequeue();
			if(current.strRepresentation === this.goal.strRepresentation) {
                return current;
            }	
			this.expandNode(current);
		}
    }

    expandNode = (node) => {
        let temp = '';
        let newState = '';
        let col = node.emptyCol;
        let row = node.emptyRow;
        let newNode = '';

        // Up
        if (row > 0) {
            newState = node.state.clone();
            temp = newState[row - 1][col];
            newState[row - 1][col] = this.empty;
            newState[row][col] = temp;
            newNode = new Node(0, newState, row - 1, col,  node.depth + 1);
            
            // 새 노드가 닫힌 노드에 존재하지 않을 때
            if (!this.visited.contains(newNode.strRepresentation)) {
                newNode.value = newNode.depth + this.heuristic(newNode);
                newNode.path = node.path + "U";
                this.queue.queue(newNode);
                this.visited.add(newNode.strRepresentation);
            }
            // console.log(newNode);
        }
        
        // Down
        if (row < node.size - 1) {
            newState = node.state.clone();
            temp = newState[row + 1][col];
            newState[row + 1][col] = this.empty;
            newState[row][col] = temp;
            newNode = new Node(0, newState, row + 1, col,  node.depth + 1);
            
            if (!this.visited.contains(newNode.strRepresentation)) {
                newNode.value = newNode.depth + this.heuristic(newNode);
                newNode.path = node.path + "D";
                this.queue.queue(newNode);
                this.visited.add(newNode.strRepresentation);
            }
            // console.log(newNode);
        }
        
        // Left
        if (col > 0) {
            newState = node.state.clone();
            temp = newState[row][col - 1];
            newState[row][col - 1] = this.empty;
            newState[row][col] = temp;
            newNode = new Node(0, newState, row, col - 1, node.depth + 1);
            
            if (!this.visited.contains(newNode.strRepresentation)) {
                newNode.value = newNode.depth + this.heuristic(newNode);
                newNode.path = node.path + "L";
                this.queue.queue(newNode);
                this.visited.add(newNode.strRepresentation);
            }

            // console.log(newNode);
        }

        // Right
        if (col < node.size - 1) {
            newState = node.state.clone();
            temp = newState[row][col + 1];
            newState[row][col + 1] = this.empty;
            newState[row][col] = temp;
            newNode = new Node(0, newState, row, col + 1, node.depth + 1);
                
            if (!this.visited.contains(newNode.strRepresentation)) {
                newNode.value = newNode.depth + this.heuristic(newNode);
                newNode.path = node.path + "R";
                this.queue.queue(newNode);
                this.visited.add(newNode.strRepresentation);
            }

            // console.log(newNode);
        }
    }
}
