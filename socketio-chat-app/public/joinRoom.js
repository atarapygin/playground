function joinRoom(roomName) {
  // Send this roomName to the server
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    // we want to update the room member total now that we have joined the room
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `Users: ${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
  });
}
