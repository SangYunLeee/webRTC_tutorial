import * as utils from "./modules/utils.js";
import * as ws from "./modules/ws.js";
import { DOM } from "./modules/utils.js";
import * as ajax from "./modules/ajax.js";
const userId = `${String(Date.now())}_${Math.floor(Math.random() * 1000000)}`;

utils.initUI(userId);

const wsConnection = new WebSocket(`/?userId=${userId}`);

ws.registerSocketEvents(wsConnection, userId);

console.log(DOM.createRoomButton);

DOM.createRoomButton.addEventListener("click", () => {
  const roomName = DOM.inputRoomNameElement.value;
  if (!roomName) {
    utils.logToConsole("Please enter a room name", {
      color: "red",
      highlight: true,
    });
  }
  ajax.createRoom(roomName, userId);
});

DOM.joinRoomButton.addEventListener("click", () => {
  ws.joinRoom(wsConnection, userId);
});
