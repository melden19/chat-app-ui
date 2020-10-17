import React, { useEffect } from 'react'
import WebSocketConnection from './models/WebSocketConnection';

interface Props {
    
}

const Messanger = (props: Props) => {
    useEffect(() => {
        const connection = new WebSocketConnection('/messages', {
            hooks: {
                onOpen: handleConnection,
                onMessage: handleMessage
            }
        });

        return () => {
            connection.close();
        }
    }, []);

    const handleConnection = (socket: any) => {
        alert('connected');
    }

    const handleMessage = (message: any) => {
        console.log(message);
    }

    return (
        <div>
            Massanger
        </div>
    )
}

export default Messanger;
