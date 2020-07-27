import { boardTypes } from './types';


const initialState = {
    board: [],
    previousBoard: [],
    end: false,
    win: false,
    vector: { x: 0, y: 0 },
    score: 0,
    time: 0
};



const cellReducer = (state = initialState, action) => {

    switch (action.type) {
        //------------------BUILD------------------------
        case boardTypes.BUILD:
            return {
                ...state,
                previousBoard: action.board,
                board: action.board
            };


        case boardTypes.SET_VECTOR:
            // let tempBoardMove = state.board.map(row => {
            //     return row.map(cell => {
            //         cell.vector = action.vector
            //         return cell
            //     })
            // }
            // )
            return {
                ...state,
                vector: action.vector
            };

        case boardTypes.MOVE:
            return {
                ...state,
                previousBoard: state.board,
                board: action.tempBoard,
                score: state.score + action.scoreAdd.value
            };

        case boardTypes.TIME:
            return {
                ...state,
                time: state.time + 1
            };
        default:
            return { ...state };
    }
}


export default cellReducer;