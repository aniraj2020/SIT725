let io;

module.exports = {
  init: (serverInstance) => {
    io = require('socket.io')(serverInstance);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  }
};
