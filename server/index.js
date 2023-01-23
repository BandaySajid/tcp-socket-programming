const net = require('node:net');

const PORT = process.env.PORT || 9090;

let clients = [];

const server = net.createServer((socket)=>{
});

server.on("connection", (socket)=>{
    clients.push(socket);
    console.log('a client connected to socket server');
    clients.forEach((client)=>{
        if(client !== socket){
            client.write(JSON.stringify({
                name : 'server',
                message : 'a client joined the chat'
            }));
        }
    });
    
    socket.on('close', ()=>{
        console.log('client disconnected from sever');
        clients = clients.filter((client)=>{
            return client !== socket;
        });
    });

    socket.on('data', (data)=>{
        const parsedData = JSON.parse(data.toString());
        console.log('client said', parsedData);
        clients.forEach((client)=>{
            if(client !== socket){
                client.write(JSON.stringify(parsedData));
            }
        });
    });
});

server.listen(PORT, ()=>{
    console.log('tcp-socket server is listening on 127.0.0.1:'+PORT);
});