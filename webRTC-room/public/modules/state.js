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

const setRoomName = (roomName) => {
  setState({ roomName });
}

const getRoomName = () => {
  return getState().roomName;
}

const resetState = () => {
  setState({
    roomName: null,
  });
}

export { setState, getState, setUserId, setWsConnection, setRoomName, getRoomName, resetState };
