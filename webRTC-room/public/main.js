import * as utils from "./modules/utils.js";
import * as ws from "./modules/ws.js";
import { DOM } from "./modules/utils.js";
import * as ajax from "./modules/ajax.js";
import * as state from "./modules/state.js";
const userId = `${String(Date.now())}_${Math.floor(Math.random() * 1000000)}`;

utils.initUI(userId);

const wsConnection = new WebSocket(`/?userId=${userId}`);

ws.registerSocketEvents(wsConnection, userId);

DOM.createRoomButton.addEventListener("click", () => {
  const roomName = DOM.inputRoomNameElement.value;
  if (!roomName) {
    utils.logToConsole("방 이름을 입력해주세요", {
      color: "red",
    });
    return;
  }
  ajax.createRoom(roomName, userId);
});

DOM.joinRoomButton.addEventListener("click", () => {
  ws.joinRoom(wsConnection, userId);
});

DOM.inputRoomNameElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    createRoomButton.click();
  }
});

DOM.destroyRoomButton.addEventListener("click", () => {
  ajax.destroyRoom(state.getRoomName(), userId);
  state.setRoomName(null);
});
