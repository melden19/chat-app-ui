export type ClientHooks = {
    onOpen: (socket: WebSocket) => void,
    onMessage: (message: string | Buffer | ArrayBuffer) => void
    onClose: () => void,
    onError: (message: string) => void,
}

export enum ConnectionStatus {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED
}

export interface Options {
    hooks?: Partial<ClientHooks>
}

export type ConnectionOpenedEvent = Event & { target: WebSocket, currentTarget: WebSocket };