import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

let connections = [];
let rooms = [];

const PORT = 8080;

const app = express();

const server = http.createServer(app);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.post("/create-room", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const { roomName, userId } = JSON.parse(body);
    const existingRoom = rooms.find((room) => room.roomName === roomName);
    if (existingRoom) {
      res.status(400).json({
        data: {
          type: type.ROOM_CHECK.RESPONSE_FAILED,
          message: "Room already exists",
        }
      });
      return;
    } else {
      rooms.push({ roomName, peer1: userId, peer2: null });
      res.status(200).json({
        data: {
          type: type.ROOM_CHECK.RESPONSE_SUCCESS,
          message: "Room created successfully",
        },
      });
    }
  });
});



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", handleConnection);

function handleConnection(ws, req) {
  const userId = extractUserId(req);
  console.log(`Client connected: ${userId}`);
  ws.userId = userId;

  addConnection(ws, userId);

  ws.on("message", handleMessage);

  ws.on("close", () =>handleClose(userId));

  ws.on("error", handleError);
}

function addConnection(ws, userId) {
  connections.push({ ws, userId });
  console.log(`Added connection: ${userId}`);
  console.log(`Total connections: ${connections.length}`);
}

function removeConnection(userId) {
  console.log(`Removing connection: ${userId}`);
  connections = connections.filter((connection) => connection.userId !== userId);
}

function extractUserId(req) {
  const queryParams = new URLSearchParams(req.url.split("?")[1]);
  const userId = queryParams.get("userId");
  return userId;
}

function handleMessage(message) {
  console.log(`Received message: ${message}`);
}

function handleClose(userId) {
  removeConnection(userId);
  console.log(`Client disconnected: ${userId}`);
}

function handleError(error) {
  console.error(`Error: ${error}`);
}
