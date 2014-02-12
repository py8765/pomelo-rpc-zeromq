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
  // {id: 'test-server-1', serverType: 'test', host: 'pomelo3.server.163.org', port: 3333}
  {id: 'test-server-1', serverType: 'test', host: '10.120.144.102', port: 3333}
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

// var sum = 10000
var sum = 300
  , retNum = 0
  // , sendInterval = 1;
  , sendInterval = 100;

client.start(function(err) {
  console.log('rpc client start ok.');

  client.addProxies(records);
  client.addServers(servers);

  var msg = 'Hello World';

  var beginTime = Date.now();

  var idx = setInterval(function() {
    client.proxies.user.test.service.echo(routeParam, msg, function(err, resp) {
      ++retNum;

      if(err) {
        console.error(err.stack);
      }

      var d = new Date();
      var ts = '[' + d.toLocaleTimeString() + '.' + d.getMilliseconds() + '] ';
      console.log('%s%d : resp = %s', ts, retNum, resp);

      if(retNum >= sum) {
        clearInterval(idx);
        var endTime = Date.now();
        console.log('========================');
        console.log('cost time : %d', endTime - beginTime);
        console.log('========================');
      }
    });
  }, sendInterval);
});

