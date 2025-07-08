import * as utils from "./modules/utils.js";
import * as ws from "./modules/ws.js";

const userId = `${String(Date.now())}_${Math.floor(Math.random() * 1000000)}`;

utils.initUI(userId);

const wsConnection = new WebSocket(`/?userId=${userId}`);

ws.registerSocketEvents(wsConnection, userId);
