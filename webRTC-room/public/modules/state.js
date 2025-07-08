let state = {
  userId: null,
  wsConnection: null,
}

const setState = (newState) => {
  state = { ...state, ...newState };
}

const getState = () => {
  return state;
}

const setUserId = (userId) => {
  setState({ userId });
}

const setWsConnection = (wsConnection) => {
  setState({ wsConnection });
}

export { setState, getState, setUserId, setWsConnection };
