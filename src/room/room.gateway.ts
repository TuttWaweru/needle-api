import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomInput } from './dto/room.input';
import { RoomService } from './room.service';

class ConnectedUser {
  // room: string;
  client: string;
}

class Message {
  message: string;
  by: string;
  created_at: string;
}

class RoomMessage {
  name: string;
  message: Message;
}

@WebSocketGateway(9229)
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedRooms: any = {};

  connectedUsers: ConnectedUser[] = [];

  constructor(
    private readonly roomService: RoomService,
  ){}
  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  afterInit(server: Server) {
    console.log('After init.');
  }

  handleConnection(client: Socket) {
    console.log(`Client Connected: ${client.id}`);
    console.table(client.handshake.query)
    this.server.to(client.id).emit('connection_status', "Success");
  }

  handleDisconnect(client: any) {
    console.log('handleDisconnect.');
    console.log(this.connectedRooms)
    for (const room of Object.keys(this.connectedRooms)){
      this.connectedRooms[room] = this.connectedRooms[room].filter(user => user !== client.id)
    }
    console.log(this.connectedRooms)
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, data: any): Promise<any> {
    console.log(`join room: ${JSON.stringify(data)}`)
    if (this.connectedRooms[data]) {
      if(this.connectedRooms[data].indexOf(client.id) < 0) {
        this.connectedRooms[data].push(client.id);
      }
    } else {
      this.connectedRooms[data] = [client.id]
    }
    console.log(this.connectedRooms)
    client.join(data);
    this.server.to(client.id).emit("room_joined", { room: data, participants: this.connectedRooms[data] })
    const otherUser = this.connectedRooms[data].find(id => id !== client.id)
    if (otherUser) {
      // this.server.in(data).emit('online', true)
      this.server.to(client.id).emit("user_joined", { party: otherUser, data: true, room: data, participants: this.connectedRooms[data] })
      this.server.to(otherUser).emit("other_user", { party: client.id, data: true, room: data, participants: this.connectedRooms[data] })
    }

    // // Send last messages to the connected user
    // this.server.to(this.connectedUsers.find(({room}) => room === data.room.name).client).emit('message', messages);
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, data: RoomMessage): Promise<any> {
    try {
      console.log(`message: ${JSON.stringify(data)}`)
      const { message, name } = data;
      const matchingRoom = await this.roomService.findOne({ where: { and: [ { key: "name", value: name } ] } })
      if (matchingRoom !== null) {
        console.table(matchingRoom['messages'])
        matchingRoom['messages'] = JSON.stringify([ ...JSON.parse(matchingRoom.messages), message ])
        console.table(matchingRoom['messages'])
        const { createdAt, updatedAt, deletedAt, ...update } = matchingRoom
        const [updatedRoom] = await this.roomService.update([update])
        console.log(`has updated`)

        this.connectedRooms[name].reduce((res, v) => {
          return (v !== client.id) ? res.to(v) : res
        }, this.server).emit("received_message", message)
        
        // this.server.to(name).emit("received_message", message)
      } else {
        this.server.to(client.id).emit("error", "cannot post message")
      }
    } catch (error) {
      this.server.to(client.id).emit("error", "cannot post message")
    }

    // // Send last messages to the connected user
    // this.server.to(this.connectedUsers.find(({room}) => room === data.room.name).client).emit('message', messages);
  }
}
