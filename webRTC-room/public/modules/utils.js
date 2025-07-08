import * as state from "./state.js";

// selecting DOM elements
const user_session_id_element = document.getElementById("session_id_display");
const infoModalButton = document.getElementById('info_modal_button');
const infoModalContainer = document.getElementById('info_modal_content_container');
const closeModalButton = document.getElementById('close');
const inputRoomNameElement = document.getElementById('input_room_channel_name');
const joinRoomButton = document.getElementById('join_button');
const createRoomButton = document.getElementById('create_room_button');
const roomNameHeadingTag = document.getElementById('room_name_heading_tag');
const landingPage = document.getElementById('landing_page_container');
const roomInterface = document.getElementById('room_interface');
const messagesContainer = document.getElementById('messages');
const messageInputField = document.getElementById('message_input_field');
const messageInputContainer = document.getElementById('message_input');
const sendMessageButton = document.getElementById('send_message_button');
const destroyRoomButton = document.getElementById('destroy_button');
const exitButton = document.getElementById('exit_button');
const consoleDisplay = document.getElementById('console_display');

// learning purposes
const offerorButtonsContainer = document.getElementById("offeror_process_buttons");
const offerorCreatePcButton = document.getElementById("create_pc");
const offerorAddDataTypeButton = document.getElementById("add_data_type");
const offerorCreateOfferButton = document.getElementById("create_offer");
const offerorUpdateLocalDescriptionButton = document.getElementById("update_local_description");
const offerorSendOfferButton = document.getElementById("send_offer");
const offerorSetRemoteDescriptionButton = document.getElementById("set_remote_description");
const offerorIceButton = document.getElementById("ice_offeror");

const offereeButtonsContainer = document.getElementById("offeree_process_buttons");
const offereeCreatePcButton = document.getElementById("offeree_create_pc");
const offereeAddDataTypeButton = document.getElementById("offeree_add_data_type");
const offereeUpdateRemoteDescriptionButton = document.getElementById("offeree_update_remote_description");
const offereeCreateAnswerButton = document.getElementById("offeree_create_answer");
const offereeUpdateLocalDescriptionButton = document.getElementById("offeree_update_local_description");
const offereeSendAnswerButton = document.getElementById("offeree_send_answer");
const offereeIceButton = document.getElementById("ice_offeree");

export function initUI(userId) {
  user_session_id_element.textContent = `sessionId: ${userId}`;
  state.setUserId(userId);
  setupModalEvent();
}

function setupModalEvent() {
  infoModalButton.addEventListener("click", modelOpen);
  closeModalButton.addEventListener("click", modelClose);

  window.addEventListener("click", (e) => {
    if (e.target.id === "info_modal_content_container") {
      modelClose();
    }
  });
}

function modelOpen() {
  infoModalContainer.classList.add("show");
  infoModalContainer.classList.remove("hide");
}

function modelClose() {
  infoModalContainer.classList.remove("show");
  infoModalContainer.classList.add("hide");
}


export function logToConsole(message, {
  color = "white",
  highlight = false,
}) {
  const consoleDisplayText = document.createElement("div");
  consoleDisplayText.classList.add("console-message");
  consoleDisplayText.textContent = message;
  consoleDisplayText.style.color = color;
  if (highlight) {
  }
  consoleDisplay.appendChild(consoleDisplayText);
  consoleDisplay.scrollTop = consoleDisplay.scrollHeight;
}
