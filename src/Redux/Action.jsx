// actions.js
export const SET_TRUE = 'SET_TRUE';
export const SET_FALSE = 'SET_FALSE';

export const setTrue = () => ({
  type: SET_TRUE
});

export const setFalse = () => ({
  type: SET_FALSE
});


export const SET_INPUT_DATA = 'SET_INPUT_DATA';

export const setInputData = (data) => ({
  type: SET_INPUT_DATA,
  payload: data
});

export const SPINNER_LOADING='SPINNER_LOADING';
export const setIsLoaging=()=>{
    type: SPINNER_LOADING
}