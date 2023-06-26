import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const MessageReceiver = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:4000');
        console.log(socket)

        socket.on('Message', (message) => {
            console.log(message)
            setMessages((prevMessages) => [...prevMessages, message]);
        });


        socket.emit('solicitar-mensagens');

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <div id="register" className="register">
                <div className='login-wrapper'>
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MessageReceiver;