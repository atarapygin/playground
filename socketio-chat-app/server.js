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
  const thisNs = io.of(namespace.endpoint);

  thisNs.on("connection", (socket) => {
    console.log(socket.id);
  });
});
