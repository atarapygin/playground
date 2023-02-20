function joinNs(endpoint) {
  nsSocket = io(`http://localhost:9000${endpoint}`);

  nsSocket.on("nsRoomLoad", (nsRooms) => {
    const roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";

    nsRooms.forEach((room) => {
      const glpyh = room.privateRoom ? "lock" : "globe";
      roomList.innerHTML += `<li key="${room.roomId}" class="room"><span class="glyphicon glyphicon-${glpyh}"></span>${room.roomTitle}</li>`;
    });
    // add click listener to each room
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log(`Someone clicked on ${e.target.innerText}`);
      });
    });

    // add room automatically... first time here
    const topRoom = document.querySelector(".room");
    const topRoomName = topRoom.innerText;
    joinRoom(topRoomName);
  });

  nsSocket.on("messageToClients", (msg) => {
    document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
  });

  document.querySelector("#user-input").addEventListener("submit", (event) => {
    event.preventDefault();
    const newMessage = document.querySelector("#user-message").value;
    nsSocket.emit("newMessageToServer", { text: newMessage });
    document.querySelector("#user-input").reset();
  });
}
