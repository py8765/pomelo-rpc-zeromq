var Client = require('..').client;

// remote service interface path info list
var records = [
  {namespace: 'user', serverType: 'test', path: __dirname + '/remote/test'}
];

var context = {
  serverId: 'test-server-1'
};

// server info list
var servers = [
  // {id: 'test-server-1', serverType: 'test', host: '10.120.144.102', port: 3333}
  {id: 'test-server-1', serverType: 'test', host: 'pomelo3.server.163.org', port: 3333}
];

// route parameter passed to route function
var routeParam = null;

// route context passed to route function
var routeContext = servers;

// route function to caculate the remote server id
var routeFunc = function(routeParam, msg, routeContext, cb) {
  cb(null, routeContext[0].id);
};

var client = Client.create({routeContext: routeContext, router: routeFunc, context: context});

client.start(function(err) {
  console.log('rpc client start ok.');

  client.addProxies(records);
  client.addServers(servers);

  var msg = 'Hello World';
  client.proxies.user.test.service.echo(routeParam, msg, function(err, resp) {
    if(err) {
      console.error(err.stack);
    }
    console.log(resp);
  });
});
