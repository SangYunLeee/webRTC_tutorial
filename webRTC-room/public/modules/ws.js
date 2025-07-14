import * as state from "./state.js";
import * as uiUtils from "./utils.js";
import * as constants from "./constants.js";

export const registerSocketEvents = (ws, userId) => {
  state.setWsConnection(ws);

  ws.onopen = () => {
    console.log("Connected to server");
    uiUtils.logToConsole(`서버 접속 완료, 사용자 ID: ${userId}`, { highlight: true });

    ws.onmessage = handleMessage;

    ws.onclose = () => {
      console.log("서버 연결 끊김");
      uiUtils.logToConsole("서버 연결 끊김", { highlight: true });
    };

    ws.onerror = (error) => {
      console.error(`오류: ${error}`);
      uiUtils.logToConsole(`오류: ${error}`, { highlight: true });
    };
  };
}

export const joinRoom = (userId, roomName) => {
  const message = {
    label: constants.labels.NORMAL_SERVER_PROCESS,
    data: {
      type: constants.type.ROOM_JOIN.REQUEST,
      userId,
      roomName,
    },
  };
  console.log(message);
  const ws = state.getWsConnection();
  ws.send(JSON.stringify(message));
}

const handleMessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(message);
  const { label, data } = message;
  switch (label) {
    case constants.labels.NORMAL_SERVER_PROCESS:
      handleNormalServerProcess(data);
      break;
  }
}

const handleNormalServerProcess = (data) => {
  const { type, message } = data;
  switch (type) {
    case constants.type.ROOM_JOIN.NOTIFY:
      uiUtils.logToConsole(message, { highlight: true });
      break;
    case constants.type.ROOM_JOIN.RESPONSE_SUCCESS:
      uiUtils.logToConsole(message, { highlight: true });
      state.setPeerId(data.peerId);
      state.setRoomName(data.roomName);
      uiUtils.joineeToProceedToRoom();
      break;
    case constants.type.ROOM_JOIN.RESPONSE_FAILED:
      uiUtils.logToConsole(message, { highlight: true });
      break;
    default:
      uiUtils.logToConsole(`Unknown message: ${message}`, { highlight: true });
      break;
  }
}
