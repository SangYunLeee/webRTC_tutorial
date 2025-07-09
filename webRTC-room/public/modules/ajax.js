import * as utils from "./utils.js";
import * as constants from "./constants.js";
import * as state from "./state.js";
export function createRoom(roomName, userId) {
  fetch(`/create-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName, userId }),
  })
    .then((response) => response.json())
    .then((reqObj) => {
      const { data } = reqObj;
      if (data.type === constants.type.ROOM_CHECK.RESPONSE_SUCCESS) {
        state.setRoomName(roomName);
        utils.logToConsole(data.type, {color: "green"});
        utils.creatorToProceedToRoom();
      } else {
        utils.logToConsole(data.type, {color: "red"});
      }
    })
    .catch((error) => {
      utils.logToConsole(constants.type.ROOM_CHECK.RESPONSE_FAILED, {
        color: "red",
      });
    });
}

export function destroyRoom(roomName, userId) {
  fetch(`/destroy-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName, userId }),
  })
    .then((response) => response.json())
    .then((reqObj) => {
      const { data } = reqObj;
      if (data.type === constants.type.ROOM_DESTROY.RESPONSE_SUCCESS) {
        utils.logToConsole(data.type, {color: "green"});
        utils.exitRoom();
        state.resetState();
      } else {
        utils.logToConsole(data.type, {color: "red"});
      }
    })
    .catch((error) => {
      utils.logToConsole(constants.type.ROOM_DESTROY.RESPONSE_FAILED, {
        color: "red",
      });
    });
}
