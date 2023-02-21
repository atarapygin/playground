const express = require("express");
const socketio = require("socket.io");
const session = require("express-session");

const app = express();

const sessionMiddleware = session({
  secret: "changeit",
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

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
    const username = nsSocket.handshake.query.username;
    // a socket has connected to one of our chatgroup namespaces
    // send that ns group info back to the client
    nsSocket.emit("nsRoomLoad", namespace.rooms);

    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
      // deal with history... once we have it
      const roomToLeave = [...nsSocket.rooms.keys()][1];

      nsSocket.leave(roomToLeave);
      updateUsersInRoom(namespace, roomToLeave);

      nsSocket.join(roomToJoin);
      const count = io.of(namespace.endpoint).sockets.size;
      numberOfUsersCallback(count);
      const nsRoom = namespace.rooms.find(
        (room) => room.roomTitle === roomToJoin
      );
      nsSocket.emit("historyCatchUp", nsRoom.history);
      // Send back the number of users in this room to ALL sockets connected to this room
      updateUsersInRoom(namespace, roomToJoin);
    });

    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username,
        avatar: "https://via.placeholder.com/30",
      };
      const roomTitle = [...nsSocket.rooms.keys()][1];
      // we need to find the Room object for this room
      const nsRoom = namespace.rooms.find(
        (room) => room.roomTitle === roomTitle
      );
      nsRoom.addMessage(fullMsg);
      io.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg);
    });
  });
});

function updateUsersInRoom(namespace, roomToJoin) {
  const count = io.of(namespace.endpoint).adapter.rooms.get(roomToJoin)?.size;
  io.of(namespace.endpoint)
    .in(roomToJoin)
    .emit("updateMembers", count ?? 0);
}
