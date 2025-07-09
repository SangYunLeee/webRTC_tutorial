import * as constants from "../constants.js";

let rooms = [];

export function createRoom(req, res) {
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
          type: constants.type.ROOM_CHECK.RESPONSE_FAILED,
        }
      });
      return;
    } else {
      rooms.push({
        roomName,
        peer1: userId,
        peer2: null,
      });
      res.status(200).json({
        data: {
          type: constants.type.ROOM_CHECK.RESPONSE_SUCCESS,
        },
      });
    }
  });
}

export function getRooms() {
  return rooms;
}

let connections = [];

export function handleConnection(ws, req) {
  const userId = extractUserId(req);
  console.log(`Client connected: ${userId}`);
  ws.userId = userId;

  addConnection(ws, userId);

  ws.on("message", handleMessage);
  ws.on("close", () => handleClose(userId));
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