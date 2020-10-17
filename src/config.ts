export default {
    ws: {
        protocol: process.env.WS_PROTOCOL || 'ws',
        host: process.env.WS_HOST || 'localhost',
        port: process.env.WS_PORT || 8080
    }
}