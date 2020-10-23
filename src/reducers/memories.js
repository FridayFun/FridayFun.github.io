// Memories Reducer

const memoriesReducerDefaultState = [];

export default (state = memoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MEMORY':
      return [
        ...state,
        action.memory
      ];
    case 'SET_MEMORIES':
      return action.memories;
    default:
      return state;
  }
};