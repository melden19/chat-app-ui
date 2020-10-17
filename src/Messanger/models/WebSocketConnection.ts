import config from 'config'
import { IMessageEvent, ICloseEvent } from 'websocket';

import { ConnectionStatus, ClientHooks, Options, ConnectionOpenedEvent } from './types';

const codeStatusMap: { [key: number]: ConnectionStatus } = {
    0: ConnectionStatus.CONNECTING,
    1: ConnectionStatus.OPEN,
    2: ConnectionStatus.CLOSING,
    3: ConnectionStatus.CLOSED,
}

class WebSocketConnection {
    private socket: WebSocket;
    private hooks: Partial<ClientHooks> | undefined;

    constructor(resourceName: string, options?: Options) {
        this.socket = new WebSocket(WebSocketConnection.getUrl(resourceName));
        this.hooks = options?.hooks;

        this.registerListeners();
    }

    get status(): ConnectionStatus {
        return codeStatusMap[this.socket.readyState];
    }

    static getUrl(path: string) {
        const { protocol, host, port } = config.ws
        const baseUrl = `${protocol}://${host}:${port}`;
        if (path) {
            return baseUrl + path;
        }
        return baseUrl;
    }

    private connectionOpenedHandler(e: Event) {
        const openEvent = e as ConnectionOpenedEvent;
        console.log(`Connection with ${openEvent.currentTarget.url} succesfully established!`);
    
        this.hooks?.onOpen && this.hooks.onOpen(this.socket);
    }
    
    private connectionClosedHandler(e: ICloseEvent) {
        this.hooks?.onClose && this.hooks.onClose();
    }

    private messageHandler(message: IMessageEvent) {
        this.hooks?.onMessage && this.hooks.onMessage(message.data);
    }

    private errorHandler(e: Event) {
        this.hooks?.onError && this.hooks.onError('error');
    }

    private registerListeners() {
        this.socket.addEventListener('open', this.connectionOpenedHandler.bind(this));
        this.socket.addEventListener('close', this.connectionClosedHandler.bind(this));
        this.socket.addEventListener('error', this.errorHandler.bind(this));
        this.socket.addEventListener('message', this.messageHandler.bind(this));
    }

    close() {
        this.socket.close();
    }
}
export default WebSocketConnection;