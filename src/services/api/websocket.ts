// socketService.ts
import { generateDummyPassword } from "@/util/dummyPassword";
import { getSession, signIn } from "next-auth/react";
import { io } from "socket.io-client";
const socket = io("ws://192.168.1.5:8878?room=a", {
  withCredentials: true,
  extraHeaders: {
    "sockets-header": "*"
  },
});

export const emitShowCode = async () => {
    const message = {
        type: 'CLIENT',
        message: 'token',
        room: 'a',
    };
    socket.emit('send_message', message);
};

socket.on('get_credentials', async (data: any) => {
    const password = generateDummyPassword(data.email)
    const res = await signIn('credentials', {
        login: data.email,
        senha: password,
        rememberMe: true,
        redirect: false,
    })

    if (res?.error) {
        alert(res.error)
    } else {
        await getSession();
        alert('Login Realizado com Sucesso!')
        window.location.href = '/';
    }
});


socket.on('send_message', (data: any) => {
    console.log(data);
});

socket.on('get_message', (data: any) => {
    alert('Test get message: ' + JSON.stringify(data));
    console.log(data);
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('error', (error: any) => {
    console.error('Error with socket connection:', error);
});


export default socket;