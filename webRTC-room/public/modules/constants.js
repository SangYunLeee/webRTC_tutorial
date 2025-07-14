export const type = {
  ROOM_CHECK: {
    RESPONSE_FAILED: "방을 만들지 못해버렸습니다.",
    RESPONSE_SUCCESS: "방을 만들었습니다.",
  },
  ROOM_DESTROY: {
    RESPONSE_FAILED: "방을 터뜨리지 못했습니다.",
    RESPONSE_SUCCESS: "방이 터져버렸습니다.",
  },
  ROOM_JOIN: {
    RESPONSE_FAILED: "방에 입장하지 못했습니다.",
    RESPONSE_SUCCESS: "방에 입장했습니다.",
    REQUEST: "방에 입장하기",
    NOTIFY: "누군가 방에 입장했습니다.",
  },
};

export const labels = {
  NORMAL_SERVER_PROCESS: "NORMAL_SERVER_PROCESS",
  WEBRTC_SERVER_PROCESS: "WEBRTC_SERVER_PROCESS",
}
