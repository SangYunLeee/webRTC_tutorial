import { getState, setWsConnection } from "./state.js";
import * as uiUtils from "./utils.js";

export const registerSocketEvents = (ws, userId) => {
  setWsConnection(ws);

  ws.onopen = () => {
    console.log("Connected to server");
    uiUtils.logToConsole(`Connected to server as ${userId}`, { highlight: true });

    ws.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
      uiUtils.logToConsole("Disconnected from server", { highlight: true });
    };

    ws.onerror = (error) => {
      console.error(`Error: ${error}`);
    };
  };
}
