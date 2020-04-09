import json

from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

clients=[];
usernames={}

class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        message = json.loads(self.data)
        if message['type'] == "login":
            msg_to_sent = "online:" + message['data']
            usernames[self.address[1]]=message['data'];
        else:
            msg_to_sent = f"{message['nickname']}: {message['data']}";
        for client in clients:
            if client != self:
                client.sendMessage(msg_to_sent)

    def handleConnected(self):
        clients.append(self)
        # print(self.address, 'connected')

    def handleClose(self):
        pass


server = SimpleWebSocketServer('', 8000, SimpleEcho)
server.serveforever()