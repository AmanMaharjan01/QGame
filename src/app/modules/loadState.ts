export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('quiz-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('quiz-state', serializedState);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Unexpedcted Error Occured!');
  }
};
