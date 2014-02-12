// remote service
var maxNum = 19970;
var curNum = 0;
var beginTime = 0;


module.exports = function(context) {
  return {
    echo: function(msg, cb) {
      if(beginTime === 0) {
        beginTime = Date.now();
      }
      ++curNum;
      if(curNum > maxNum) {
        console.error('%d ~ All RPC costTime = %d(ms)', curNum, (Date.now() - beginTime));
      }
      // cb(null, 'echo: ' + msg);
      cb(null, 200);
    }
  };
};
