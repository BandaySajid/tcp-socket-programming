import net from 'node:net';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const options = {
    port : 9090,
    host : '127.0.0.1',
};

async function prompt(question){
    const answer = await rl.question(question);
    return answer;
}

const socket = net.createConnection(options, ()=>{

});

socket.on('connect', async()=>{
    console.log('connected to tcp-socket server');
    const name = await prompt("what is your name : ");
    while(true){
        const message = await prompt("message : ");
        const data = {
            name,
            message : message
        };
        socket.write(JSON.stringify(data));
    }
});

socket.on('data', (data)=>{
    const parsedData = JSON.parse(data.toString());
    console.log(parsedData.name + ' : '+parsedData.message+'\n');
});

socket.on('close', ()=>{
    console.log('disconnected from server');
    rl.close();
});

socket.on('error', (err)=>{
    rl.close();
    return console.log(err.message);
});
