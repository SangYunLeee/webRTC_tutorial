let state = {
  userId: null,
  wsConnection: null,
  roomName: null,
  peerId: null,
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

const getWsConnection = () => {
  return getState().wsConnection;
}

const setRoomName = (roomName) => {
  setState({ roomName });
}

const getRoomName = () => {
  return getState().roomName;
}

const setPeerId = (peerId) => {
  setState({ peerId });
}

const getPeerId = () => {
  return getState().peerId;
}

const resetState = () => {
  setState({
    roomName: null,
  });
}

export {
          setState,
          getState,
          setUserId,
          setWsConnection,
          getWsConnection,
          setRoomName,
          getRoomName,
          setPeerId,
          getPeerId,
          resetState,
};

