// -------//---GET---//-------
export const getAllAvailableCells = (board) => { // check empty cells
    let cells = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (!board[i][j])
                cells.push({ x: i, y: j });
        }
    }
    return cells
}
export const getCells = (board) => { // check cells with value
    let cells = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (!!board[i][j])
                cells.push(board[i][j]);
        }
    }
    return cells
}
export const getVector = (e) => {
    switch (checkKey(e.keyCode)) {
        case 0: // up
            return { x: 1, y: 0 }
        case 1:// Right
            return { x: 0, y: -1 }
        case 2:// Down
            return { x: -1, y: 0 }
        case 3:// Left
            return { x: 0, y: 1 }
        default:
            return { x: 0, y: 0 }
    }
}
export const getArrayColumn = (arr, n) => arr.map(x => x[n]);
// const getArryRow = (mat, isRow, number) => {
//     if (isRow) // if pressed left or right
//         return mat[number].filter(cell => cell)
//     else
//         return mat[number].filter(cell => cell)
// }

// -------//---SET---//------
export const resetBoard = (boardSize) => { // make all board as null
    let emptyBoard = []
    for (let i = 0; i < boardSize; i++) {
        emptyBoard[i] = []
        for (let j = 0; j < boardSize; j++) {
            emptyBoard[i][j] = null
        }
    }
    return emptyBoard
}
export const setCellVector = (cell, x, y) => {
    return { ...cell, position: { x: x, y: y } }
}

export const setPreviousPosition = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (!!board[i][j])
                board[i][j] = { ...board[i][j], previousPosition: { x: i, y: j } }
        }
    }

    return board
}

export const setMerged = (board, status) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (!!board[i][j])
                board[i][j].isMerge = false
        }
    }

    return board
}
//----------//--------FUNCTIONS----------//--------------
export const createRandomCell = (board) => {  //create a random cell in board
    let cell = null
    do {
        let randX = Math.floor((Math.random() * 4)),
            randY = Math.floor((Math.random() * 4)),
            value = Math.random() < 0.9 ? 2 : 4
        if (!board[randX][randY]) {
            board[randX][randY] = { position: { x: randX, y: randY }, value: value, previousPosition: { x: randX, y: randY }, isNew: true, isMerge: false }
            cell = board[randX][randY]
        }
    } while (!cell);
    return board
};




export const checkKey = (keyCode) => {
    const keys = {
        38: 0, 75: 0, 87: 0, // Up
        39: 1, 76: 1, 68: 1, // Right
        40: 2, 74: 2, 83: 2, // Down
        37: 3, 72: 3, 65: 3  // Left
    };
    return keys[keyCode]
}



export const sortCells = (ascending) => {
    const nullPosition = ascending ? 1 : -1
    return (a, b) => {
        if (a == null) return nullPosition
        if (b == null) return -nullPosition
        // if (a.position.x < b.position.x) return -nullPosition
        // if (a.position.x - b.position.x) return nullPosition
        return 0
    }
}
export const mergeCells = (array, ascending, scoreAdd) => {
    for (let i = 0, j = 1; j < array.length; i++ , j++) {
        if (!!array[i] && !!array[j]) {
            // array[i].isMerge = false
            // if (!!array[j])
            //     array[j].isMerge = false

            if (ascending) {
                if (array[i].value === array[j].value) {
                    array[i].value = array[i].value * 2
                    scoreAdd.value += array[i].value
                    array.splice(j, 1, null);
                    array[i].isMerge = true
                }
            }
            else {
                if (array[i].value === array[j].value) {
                    array[j].value = array[j].value * 2
                    scoreAdd.value += array[j].value
                    array[j].isMerge = true
                    array.splice(i, 1, null);
                }
            }
        }

    }
    debugger
    return array;
}

export const rearrange = (mat, isRow, ascending, scoreAdd) => {
    let tempMat = mat
    if (isRow) {
        for (let i = 0; i < tempMat.length; i++) {
            tempMat[i] = tempMat[i].sort(sortCells(ascending))// sort before the merge
            tempMat[i] = mergeCells(mat[i], ascending, scoreAdd)
            tempMat[i] = tempMat[i].sort(sortCells(ascending))// sort after the merge
            for (let j = 0; j < tempMat.length; j++) {
                if (!!tempMat[i][j]) {
                    tempMat[i][j] = setCellVector(mat[i][j], i, j)
                    tempMat[i][j].isNew = false
                }
            }
        }
    }
    else {
        //get column array and sort it by ascending
        let col0 = mergeCells(getArrayColumn(tempMat, 0).sort(sortCells(ascending)), ascending, scoreAdd),
            col1 = mergeCells(getArrayColumn(tempMat, 1).sort(sortCells(ascending)), ascending, scoreAdd),
            col2 = mergeCells(getArrayColumn(tempMat, 2).sort(sortCells(ascending)), ascending, scoreAdd),
            col3 = mergeCells(getArrayColumn(tempMat, 3).sort(sortCells(ascending)), ascending, scoreAdd)

        col0 = col0.sort(sortCells(ascending))
        col1 = col1.sort(sortCells(ascending))
        col2 = col2.sort(sortCells(ascending))
        col3 = col3.sort(sortCells(ascending))

        let allObject = col0.concat(col1, col2, col3)

        let k = 0 // to keep track on allObject array 
        for (let i = 0; i < tempMat.length; i++) { //change the matrix to new state
            for (let j = 0; j < tempMat.length; j++ , k++) {
                if (!!allObject[k])
                    allObject[k].isNew = false

                tempMat[j][i] = allObject[k]
                if (!!tempMat[j][i]) {
                    tempMat[j][i] = setCellVector(tempMat[j][i], j, i)
                }
            }
        }
    }
    return tempMat
}
