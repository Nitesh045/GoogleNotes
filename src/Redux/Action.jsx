// actions.js
export const SET_TRUE = 'SET_TRUE';
export const SET_FALSE = 'SET_FALSE';
export const NOTES='NOTES';
export const ARCHIVE='ARCHIVE';
export const TRASH='TRASH';
export const ComponentRenderRe='ComponentRenderRe';

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

export const setIsLoading=()=>({
    type:SPINNER_LOADING
})

export const setNotesTitle=()=>({
  type:NOTES
})
export const setArchiveTitle=()=>({
  type:ARCHIVE
})
export const setTrashTitle=()=>({
  type:TRASH
})
export  const setIsComponentRender=()=>({
  type:ComponentRenderRe
})
