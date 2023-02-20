const express = require("express");
const socketio = require("socket.io");

const app = express();

let namespaces = require("./data/namespaces");

app.use(express.static(`${__dirname}/public`));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  // build an array to send back with the img and endpoint for each NS
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  // send the nsData back to the clientInformation. We need to use socket, NOT io, because we
  // wantit to go to just this client
  socket.emit("nsList", nsData);
});

// loop through each namespace and listen for a connection
namespaces.forEach((namespace) => {
  io.of(`${namespace.endpoint}`).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
    // a socket has connected to one of our chatgroup namespaces
    // send that ns group info back to the client
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);

    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
      // deal with history... once we have it
      nsSocket.join(roomToJoin);
      const count = io.of(namespace.endpoint).sockets.size;
      numberOfUsersCallback(count);
    });

    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg,
        time: Date.now(),
        username: "nimble",
        avatar: "https://via.placeholder.com/30",
      };
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      io.of("/wiki").to(roomTitle).emit("messageToClients", fullMsg);
    });
  });
});
