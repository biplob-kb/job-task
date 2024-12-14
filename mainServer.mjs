import net from 'net';
const ORIGIN_PORT = 3032;


const testData = [
  'This is my test data to do the my task.\n',
  'I love Bangladesh and this is my code\n',
  'It is my homeland, so I love Bangladesh\n',
  'so I love Bangladesh without any conditions.\n',
  'this is the end.\n'
];


const mainServer = net.createServer((clientSocket) => {
  console.log('Client connected to origin server.');

 
  let chunkIndex = 0;
  const interval = setInterval(() => {
    if (chunkIndex < testData.length) {
      const chunk = testData[chunkIndex];
      console.log(`Sending chunk: ${chunk.trim()}`);
      clientSocket.write(chunk);
      chunkIndex++;
    } else {
 
      clearInterval(interval);
      console.log('All data sent, closing connection.');
      clientSocket.end();
    }
  }, 1000);


  clientSocket.on('end', () => {
    console.log('Client disconnected from origin server.');
  });


  clientSocket.on('error', (err) => {
    console.error('Error on origin server:', err.message);
  });
});


mainServer.listen(ORIGIN_PORT, () => {
  console.log(`Origin server running on port ${ORIGIN_PORT}`);
});
