const net = require('net');
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

const htmlFromRoute = path => `<h1 style="color: ${path.slice(1)}">${path.slice(1).toUpperCase()}</h1>`;

const app = net.createServer(socket => {
  
  socket.on('data', data => {
    const
      request = parseRequest(data),
      method = request.method,
      path = request.path,
      body = request.body,

      routes = {
        'GET': {
          '/': { body: 'hi', contentType: 'text/plain' },
          '/red': { body: htmlFromRoute(path) },
          '/green': { body: htmlFromRoute(path) }, 
          '/blue': { body: htmlFromRoute(path) },
        },
        'POST': {
          '/echo': { body, contentType: 'text/plain' },
        },
      },
      
      validRouteResponse = routes[method][path];
    
    if(validRouteResponse)
      socket.write(createResponse(validRouteResponse));
    else
      socket.end(createResponse({
        body: 'Not Found - YOU\'VE BEEN KICKED!!!',
        status: '404 Not Found',
        contentType: 'text/plain' }));
  });
});

module.exports = app;
