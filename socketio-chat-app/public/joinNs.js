function joinNs(endpoint) {
  if (nsSocket) {
    // check to see if nsSocket is connected
    nsSocket.close();
    // remove the event listener before it's added againe
    document
      .getElementById("user-input")
      .removeEventListener("submit", formSubmition);
  }
  nsSocket = io(`http://localhost:9000${endpoint}`);

  nsSocket.on("nsRoomLoad", (nsRooms) => {
    const roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";

    nsRooms.forEach((room) => {
      const glpyh = room.privateRoom ? "lock" : "globe";
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glpyh}"></span>${room.roomTitle}</li>`;
    });
    // add click listener to each room
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        joinRoom(e.target.innerText);
      });
    });

    // add room automatically... first time here
    const topRoom = document.querySelector(".room");
    const topRoomName = topRoom.innerText;
    joinRoom(topRoomName);
  });

  nsSocket.on("messageToClients", (msg) => {
    const newMsg = buildHTML(msg);
    document.getElementById("messages").innerHTML += newMsg;
  });

  document
    .getElementById("user-input")
    .addEventListener("submit", formSubmition);
}

function formSubmition(event) {
  event.preventDefault();
  const newMessage = document.getElementById("user-message").value;
  nsSocket.emit("newMessageToServer", { text: newMessage });
  document.getElementById("user-input").reset();
}

function buildHTML(msg) {
  const convertedDate = new Date(msg.time).toLocaleString();
  return `
    <li>
      <div class="user-image">
        <img src="${msg.avatar}" />
      </div>
      <div class="user-message">
        <div class="user-name-time">${msg.username} <span>${convertedDate}</span></div>
        <div class="message-text">${msg.text}</div>
      </div>
    </li>
  `;
}
