// reducers.js

import { ARCHIVE, ComponentRenderRe, NOTES, SET_FALSE, SET_TRUE, TRASH } from "./Action";
import { SET_INPUT_DATA } from './Action';
import { SPINNER_LOADING } from "./Action";

const initialState = {
    isTrue: false,
    inputData: '',
    isLoading:true,
    title:'NOTES',
    ComponentRender:false
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
                    isLoading:false
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
                case ComponentRenderRe:
                    return{
                        ...state,
                        ComponentRender: !state.ComponentRender
                    }
        default:
            return state;
    }
};

export default reducer;
