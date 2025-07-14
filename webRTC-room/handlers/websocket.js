import * as constants from "../constants.js";
import * as rooms from "../routes/room.js";

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
  try {
    const { label, data } = JSON.parse(message);
    switch (label) {
      case constants.labels.NORMAL_SERVER_PROCESS:
        console.log(`== from NORMAL server process ==`);
        handleNormalMessage(data);
        break;
      case constants.labels.WEBRTC_SERVER_PROCESS:
        console.log(`== from WEBRTC server process ==`);
        handleWebrtcMessage(data);
        break;
      default:
        console.error(`Unknown label: ${label}`);
    }
  }
  catch (error) {
    console.error(`Error: ${error}`);
  }
}

function handleNormalMessage(data) {
  const { type, userId, roomName } = data;
  switch (type) {
    case constants.type.ROOM_JOIN.REQUEST:
      handleRoomJoinRequest(userId, roomName);
      break;
    default:
      console.error(`Unknown type: ${type}`);
  }
}

function handleRoomJoinRequest(userId, roomName) {
  console.log(`Room join request from ${userId} to ${roomName}`);
  const existingRoom =  rooms.getRooms().find((room) => room.roomName === roomName);
  // 방이 존재하지 않을 경우
  if (!existingRoom) {
    sendMessageToPeer(userId, {
      label: constants.labels.NORMAL_SERVER_PROCESS,
      data: {
        type: constants.type.ROOM_JOIN.RESPONSE_FAILED,
        message: `Room not found: ${roomName}`,
      }
    });
    return
  }
  // 방에 이미 두 유저가 존재할 경우
  if (existingRoom.peer1 && existingRoom.peer2) {
    sendMessageToPeer(userId, {
        label: constants.labels.NORMAL_SERVER_PROCESS,
        data: {
          type: constants.type.ROOM_JOIN.RESPONSE_FAILED,
          message: `Room is full: ${roomName}`,
        }
    });
    return
  }
  let existingPeer = null;
  // 방에 한 유저만 존재할 경우, 비어있는 자리에 유저 추가
  if(existingRoom.peer1 === null) {
    existingRoom.peer1 = userId;
    existingPeer = existingRoom.peer2;
  } else if (existingRoom.peer2 === null) {
    existingRoom.peer2 = userId;
    existingPeer = existingRoom.peer1;
  }

  sendMessageToPeer(userId, {
    label: constants.labels.NORMAL_SERVER_PROCESS,
    data: {
      type: constants.type.ROOM_JOIN.RESPONSE_SUCCESS,
      message: `방에 참여했습니다. 방 이름: ${roomName}, 상대방 ID: ${existingPeer}`,
      peerId: existingPeer,
      roomName: roomName,
    }
  });
  // 방에 있는 다른 유저에게 알림 전송
  sendMessageToPeer(existingPeer, {
    label: constants.labels.NORMAL_SERVER_PROCESS,
    data: {
      type: constants.type.ROOM_JOIN.NOTIFY,
      message: `${roomName}에 유저가 참여했습니다. 유저 ID: ${userId}`,
      peerId: userId,
    }
  });
}

function sendMessageToPeer(userId, message) {
  const userConnection = connections.find((connection) => connection.userId === userId);
  if (userConnection && userConnection.ws) {
    userConnection.ws.send(JSON.stringify(message));
    console.log(`Message sent to ${userId}`);
  } else {
    console.error(`User connection not found: ${userId}`);
  }
}

function handleWebrtcMessage(data) {
  const { type, userId, roomName } = data;
}

function handleClose(userId) {
  removeConnection(userId);
  rooms.removeUserAndCleanRooms(userId);
  console.log(`User ${userId} disconnected`);
}

function handleError(error) {
  console.error(`Error: ${error}`);
} 

