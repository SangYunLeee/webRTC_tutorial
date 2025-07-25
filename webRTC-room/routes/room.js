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
          message: "동일한 이름의 방이 이미 존재합니다.",
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
          message: "방 생성 완료",
        },
      });
    }
  });
}

export function destroyRoom(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const { roomName, userId } = JSON.parse(body);
    const roomIndex = rooms.findIndex((room) => room.roomName === roomName);
    const foundRoom = rooms[roomIndex];
    if (foundRoom) {
    rooms.splice(roomIndex, 1);
    res.status(200).json({
      data: {
        type: constants.type.ROOM_DESTROY.RESPONSE_SUCCESS,
        message: "방 삭제 완료",
      },
    });
  } else {
    res.status(400).json({
      data: {
          type: constants.type.ROOM_DESTROY.RESPONSE_FAILED,
          message: "방 삭제 실패",
        },
      });
    }
  });
}
export function getRooms() {
  return rooms;
} 

// 방이 비어있는지 확인
export function isRoomEmpty(room) {
  return room.peer1 === null && room.peer2 === null;
}

// 특정 사용자를 방에서 제거
export function removedRoom(room, userId) {
  return {
    ...room,
    peer1: room.peer1 === userId ? null : room.peer1,
    peer2: room.peer2 === userId ? null : room.peer2
  };
}

// 사용자 연결 해제 및 빈 방 정리 함수
export function removeUserAndCleanRooms(userId) {
  return rooms
    .map(room => removedRoom(room, userId))
    .filter(room => !isRoomEmpty(room));
}
