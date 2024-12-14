import net from 'net';

const MAIN_PORT = 3032;
const PROXY_PORT = 3031;


const SECRET_WORD = /I love Bangladesh/gi;


const proxyServer = net.createServer((clientSocket) => {
  console.log('Client connected to proxy.');


  const mainSocket = net.createConnection(MAIN_PORT, () => {
    console.log('Connected to origin server.');
  });


  clientSocket.on('data', (data) => {
    mainSocket.write(data);
  });


  mainSocket.on('data', (data) => {
    const sanitizedData = data.toString().replace(SECRET_WORD, '------------------');
    clientSocket.write(sanitizedData);
  });

  
  clientSocket.on('end', () => {
    console.log('Client disconnected.');
    mainSocket.end();
  });


  mainSocket.on('end', () => {
    console.log('Disconnected from origin server.');
    clientSocket.end();
  });


  clientSocket.on('error', (err) => {
    console.error('Client error:', err.message);
    mainSocket.destroy();
  });

  mainSocket.on('error', (err) => {
    console.error('Origin server error:', err.message);
    clientSocket.destroy();
  });
});


proxyServer.listen(PROXY_PORT, () => {
  console.log(`Proxy server running on port ${PROXY_PORT}`);
});
