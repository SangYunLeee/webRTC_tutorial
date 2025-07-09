import { getState, setWsConnection } from "./state.js";
import * as uiUtils from "./utils.js";

export const registerSocketEvents = (ws, userId) => {
  setWsConnection(ws);

  ws.onopen = () => {
    console.log("Connected to server");
    uiUtils.logToConsole(`서버 접속 완료, 사용자 ID: ${userId}`, { highlight: true });

    ws.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
    };

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
