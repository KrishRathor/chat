import http from "http";
import SocketService from "./services/SocketService";

async function init() {

  const socketService = new SocketService();

  const httpServer = http.createServer();
  const PORT = process.env.PORT ?? 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log('Http Server started at port 8000');
  })

  socketService.initListeners();
}

init();
