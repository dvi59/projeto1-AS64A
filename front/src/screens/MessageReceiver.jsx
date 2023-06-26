import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const MessageReceiver = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:4000');


        socket.on('Message', (message) => {
            const [dateTime, errorMessage] = message.split(': ');
            const [date, time] = dateTime.split(' ');
            const formattedErrorMessage = errorMessage
                .replace(/^{"/, '') // Remover a primeira chave e as aspas iniciais
                .replace(/"}$/, '') // Remover as aspas finais
                .replace(/^error/, ''); // Remover a palavra "error" no início da descrição
            const formattedMessage = `${date} ${time} - ${formattedErrorMessage}`;
            setMessages((prevMessages) => [...prevMessages, formattedMessage]);
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