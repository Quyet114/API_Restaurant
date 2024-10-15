const { Server } = require('socket.io');

let io;

const socketConnect = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
  });

  // Xử lý kết nối
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // Lắng nghe sự kiện custom, ví dụ: thông báo
    socket.on('sendNotification', (data) => {
      const { receiverId, title, message } = data;
      console.log(`Sending notification to ${receiverId}: ${title}`);
      io.emit('receiveNotification', { title, message });
    });
  });
};

module.exports = { socketConnect, getIo: () => io };
