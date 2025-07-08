import * as utils from "./utils.js";

export function createRoom(roomName, userId) {
  fetch(`/create-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName, userId }),
  })
    .then((response) => response.json())
    .then((data) => {
      utils.logToConsole("Room created successfully", {
        color: "green",
        highlight: true,
      });
    })
    .catch((error) => {
      console.error("Error creating room:", error);
      utils.logToConsole("Error creating room:", {
        color: "red",
        highlight: true,
      });
    });
}
