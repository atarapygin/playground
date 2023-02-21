function joinRoom(roomName) {
  // Send this roomName to the server
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    // we want to update the room member total now that we have joined the room
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `Users: ${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
  });

  nsSocket.on("historyCatchUp", (history) => {
    const messagesUl = document.getElementById("messages");
    messagesUl.innerHTML = "";
    history.forEach((message) => {
      const newMessage = buildHTML(message);
      const currentMessages = messagesUl.innerHTML;
      messagesUl.innerHTML = currentMessages + newMessage;
    });
    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });

  nsSocket.on("updateMembers", (count) => {
    // we want to update the room member total now that we have joined the room
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `Users: ${count} <span class="glyphicon glyphicon-user"></span>`;
    document.querySelector(".curr-room-text").innerText = roomName;
  });

  let searchBox = document.getElementById("search-box");
  searchBox.addEventListener("input", (e) => {
    let messages = document.getElementsByClassName("message-text");
    Array.from(messages).forEach((message) => {
      const wasNotFind =
        message.innerText
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) === -1;
      if (wasNotFind) {
        message.style.display = "none";
      } else {
        message.style.display = "block";
      }
    });
  });
}
