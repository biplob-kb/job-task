import net from 'net';

const client = net.createConnection({ port: 3031 }, () => {
    console.log('Connected to proxy server');
});

client.on('data', (data) => {
    console.log('Received:', data.toString());
});

client.on('end', () => {
    console.log('Disconnected from server');
});

client.on('error', (err) => {
    console.error('Error:', err.message);
});
