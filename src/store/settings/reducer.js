import { settingsTypes } from './types';


const initialState = {
    time: 0,
};



const cellReducer = (state = initialState, action) => {

    switch (action.type) {
        //------------------BUILD------------------------
        case settingsTypes.TIME:
            return {
                ...state,
                time: state.time + 1
            };

        default:
            return { ...state };
    }
}


export default cellReducer;
