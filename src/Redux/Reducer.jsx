// reducers.js

import { ARCHIVE, NOTES, SET_FALSE, SET_TRUE, TRASH } from "./Action";
import { SET_INPUT_DATA } from './Action';
import { SPINNER_LOADING } from "./Action";

const initialState = {
    isTrue: false,
    inputData: '',
    isLoaging:true,
    title:'NOTES'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRUE:
            return {
                ...state,
                isTrue: true
            };
        case SET_FALSE:
            return {
                ...state,
                isTrue: false
            };
        case SET_INPUT_DATA:
            return {
                ...state,
                inputData: action.payload
            };
            case SPINNER_LOADING:
                return{
                    ...state,
                    isLoaging:true
                }
                case NOTES:
                    return{
                        ...state,
                        title:"NOTES"
                    }
                case ARCHIVE:
                    return{
                        ...state,
                        title:"ARCHIVE"
                    }
                case TRASH:
                    return{
                        ...state,
                        title:"TRASH"
                    }
        default:
            return state;
    }
};

export default reducer;
