import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import * as room from "./routes/room.js";
import { handleConnection } from "./handlers/websocket.js";

const PORT = 8080;
const app = express();
const server = http.createServer(app);

// 미들웨어 설정
app.use(express.static("public"));

// 라우트 설정
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.post("/create-room", room.createRoom);
app.post("/destroy-room", room.destroyRoom);

// 서버 시작
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// WebSocket 서버 설정
const wss = new WebSocketServer({ server });
wss.on("connection", handleConnection); 
