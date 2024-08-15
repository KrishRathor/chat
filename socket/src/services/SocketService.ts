import { Server } from "socket.io";

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

      socket.on('event:message', (data) => {
        console.log(data);
      })

    })

  }

}

export default SocketService;
