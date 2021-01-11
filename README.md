# SOCKET-CHAT

1. Get Started
    - npm install
    - node index.js

2. How to use?
    - Server Side
        - Create Connection
            ```
            io.on('connection', (socket) => {
                // do something after connected
            });
            ```
        - Create new event listener
            ```
            socket.on('event_name', (data) =>
                {
                    socket.emit('event_name', data);
                });
            ```
    - Client Side
        - install socket_io_client
        - Create Connection
            ```
            Socket socket = io('https://socket.tzs580.com/', {
                'transports': ['websocket'],
                'autoConnect': false,
            });
            socket.connect();
            ```
        - Listener Event
            ```
                socket.on('connect', (_) {
                    // do something after connected
                });

                socket.on('event_name', (response) {
                    // handle response from server
                });

                socket.on('disconnect', (_) {
                    // handle after disconnected
                });

            ```