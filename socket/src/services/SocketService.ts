import { Server } from "socket.io";

const users: Record<string, string> = {};

class SocketService {
  private _io: Server

  constructor() {
    console.log(`Init Socket Service`);
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*'
      }
    });
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    const io = this.io;

    console.log(`Initialized Socket Listeners`);

    io.on('connect', (socket) => {
      console.log(`New socket connected... with socket id ${socket.id}`)

      const token = socket.handshake.query.userToken;
      if (typeof token === "string") {
        users[token] = socket.id;
        console.log(users);
      }

      io.emit('userList', users);

      socket.on('event:message', data => {
        const { msg, fromEmail, toEmail } = JSON.parse(data);
        console.log(fromEmail, toEmail);
        const toSocketId = users[toEmail];
        io.to(toSocketId).emit('event:message:reply', JSON.stringify({ msg, fromEmail, toEmail }));
      })

      socket.on("event:typing", data => {
        console.log(data);
        const { from, to } = JSON.parse(data);
        const toSocketId = users[to];
        io.to(toSocketId).emit("event:typing:reply", JSON.stringify({ from, to }));
      })

      socket.on('disconnect', () => {
        console.log('User disconnected');
        for (const userId in users) {
          if (users[userId] === socket.id) {
            delete users[userId];
            break;
          }
        }
        io.emit('userList', users);
      });

    })

  }

}

export default SocketService;
