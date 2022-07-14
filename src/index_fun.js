import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

const Board = ({squares, click}) => {
    return (
        <div>
            <div className="board-row">
                <Square key = {0} value = {squares[0]} onClick = {() => click(0)} />
                <Square key = {1} value = {squares[1]} onClick = {() => click(1)} />
                <Square key = {2} value = {squares[2]} onClick = {() => click(2)} />
            </div>
            <div className="board-row">
                <Square key = {3} value = {squares[3]} onClick = {() => click(3)} />
                <Square key = {4} value = {squares[4]} onClick = {() => click(4)} />
                <Square key = {5} value = {squares[5]} onClick = {() => click(5)} />
            </div>
            <div className="board-row">
                <Square key = {6} value = {squares[6]} onClick = {() => click(6)} />
                <Square key = {7} value = {squares[7]} onClick = {() => click(7)} />
                <Square key = {8} value = {squares[8]} onClick = {() => click(8)} />
            </div>
        </div>
    );
}

const Game = () => {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setIsNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (index) => {
        const boardCopy = [...board];
        // Определить быд ли клик по ячейке или игра закончена
        if (winner || boardCopy[index]) return;
        // Определить чей ход
        boardCopy[index] = xIsNext ? 'X' : 'O';
        // Обновть состояние
        setBoard(boardCopy);
        setIsNext(!xIsNext);
    };

    const startNewGame = () => {
        return (
            <button className = "start_btn" onClick = {() => setBoard(Array(9).fill(null))}> Очистить поле </button>
        );
    }

    return (
        <div className="game">
            <div className="game-board">
                {startNewGame()}
                <Board squares={board} click={handleClick} />
                {winner ? "Победитель " + winner : "Сейчас ходит " + (xIsNext ? 'X' : 'O')}
            </div>
        </div>
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}