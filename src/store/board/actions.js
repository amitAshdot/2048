import { boardTypes } from './types';
import { resetBoard, createRandomCell, getVector, rearrange, setPreviousPosition, setMerged, getAllAvailableCells, checkMoves } from './functions'
//----------//--------ACTIONS----------//--------------
//------------------EXPORT------------------------
export const build = () => {
    const boardSize = 4, startCells = 2
    let board = resetBoard(boardSize)
    for (let i = 0; i < startCells; i++) {
        board = createRandomCell(board)
    }
    return {
        type: boardTypes.BUILD,
        board
    };
};

export const setVector = (e) => {
    let vector = getVector(e);
    return {
        type: boardTypes.SET_VECTOR,
        vector
    };
};

export const move = (board, vector) => {
    let scoreAdd = { value: 0 };
    let tempBoard = JSON.parse(JSON.stringify(board)); // DEEP COPY OF MATRIX
    let moveAvailable = null
    tempBoard = setPreviousPosition(board)
    tempBoard = setMerged(tempBoard, false)

    if (vector.x > 0) {//up
        tempBoard = rearrange(tempBoard, false, true, scoreAdd)
    }
    else if (vector.x < 0) {//down
        tempBoard = rearrange(tempBoard, false, false, scoreAdd)

    }
    else if (vector.y < 0) {//right
        tempBoard = rearrange(tempBoard, true, false, scoreAdd)

    }
    else if (vector.y > 0) {//left
        tempBoard = rearrange(tempBoard, true, true, scoreAdd)
    }
    const availableCells = getAllAvailableCells(board)
    if (availableCells !== undefined && availableCells.length !== 0) {
        tempBoard = createRandomCell(tempBoard)
    }
    if (availableCells)
        moveAvailable = checkMoves(board)

    return {
        type: boardTypes.SET_MOVE,
        tempBoard,
        scoreAdd,
        moveAvailable
    };
};

export const time = () => {
    return {
        type: boardTypes.SET_TIME,
    };
};

export const end = () => {
    return {
        type: boardTypes.END,
    };
};

export const startOver = () => {
    const temp = build()
    const board = temp.board

    return {
        type: boardTypes.START_OVER,
        board
    };
};

