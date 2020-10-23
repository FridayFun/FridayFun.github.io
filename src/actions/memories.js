import database from '../firebase/firebase';

// ADD_MEMORY
export const addMemory = (memory) => ({
  type: 'ADD_MEMORIES',
  name,
  memory
});

export const startAddMemory = (memory = {}) => {
  return (dispatch) => {
    return database.ref(`memories`).push(memory).then((ref) => {
      dispatch(addMemory({
        id: ref.key,
        memory
      }));
    });
  };
};

// SET_MEMORIES
export const setMemories = (memories) => ({
  type: 'SET_MEMORIES',
  memories
});

export const startSetMemories = () => {
  return (dispatch) => {
    return database.ref(`memories`).once('value').then((snapshot) => {
      const memories = [];

      snapshot.forEach((childSnapshot) => {
        const val = childSnapshot.val();
        memories.push({
          id: childSnapshot.key,
          val
        });
      });
      dispatch(setMemories(memories));
    });
  };
};