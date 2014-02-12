var Server = require('..').server;

// remote service path info list
var paths = [
  {namespace: 'user', path: __dirname + '/remote/test'}
];

// var host = '10.120.144.102';
var host = 'pomelo3.server.163.org';
var port = 3333;

var server = Server.create({paths: paths, port: port, host: host});
server.start();

console.log('RPC server started (port:%d) ...', port);

