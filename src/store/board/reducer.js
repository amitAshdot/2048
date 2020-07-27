import { boardTypes } from './types';


const initialState = {
    board: [],
    previousBoard: [],
    vector: { x: 0, y: 0 },
    score: 0,
    time: 0,
    finish: false // true if reach to cell 2048 OR there is no more available cells
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

        //------------------SET------------------------
        case boardTypes.SET_VECTOR:
            return {
                ...state,
                vector: action.vector
            };

        case boardTypes.SET_MOVE:
            return {
                ...state,
                previousBoard: state.board,
                board: action.tempBoard,
                score: state.score + action.scoreAdd.value
            };

        case boardTypes.SET_TIME:
            return {
                ...state,
                time: state.time + 1
            };
        default:
            return { ...state };
    }
}


export default cellReducer;