import { Server } from 'socket.io';

const socketConfig = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinZone', (zone_id) => {
      socket.join(zone_id);
    });

    socket.on('leaveZone', (zone_id) => {
      socket.leave(zone_id);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

export default socketConfig;
