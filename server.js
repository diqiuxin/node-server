var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];

if(!port){
  console.log('请指定端口号 eg: \nnode server.js 8888 ');
  process.exit(1);
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true);
  var path = request.url;
  var query = '';
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')); }
  var pathNoQuery = parsedUrl.pathname;
  var queryObject = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/
console.log('-----------------------');
console.log('HTTP 路径为: \n' + path);

if(path == '/' ){
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.write('<!DOCTYPE>\n' +
  '<html><head>' + 
  '<link rel="stylesheet" href="/style.css">' +
  '</head><body>'  +
  '<h1>你好</h1>' +
  '<h3> <a href="http://www.diqiuxin.top">地球心-赵博-杭州</a> </h3>' +
  '<script src="/main.js"></script>' +
  '</body></html>');
  response.end();
  console.log('html文件已经发送');
}else if(path == '/style.css'){
  response.setHeader('Content-Type', 'text/css; charset=utf-8');
  response.write('body{background-color: #ddd;}h1{color: red;}');
  response.end();
  console.log('css文件已经发送');
}else if(path == '/main.js'){
  response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
  response.write('alert("这是JS执行的 :) ")');
  response.end();
  console.log('js文件已经发送');
}else {
  response.statusCode = 404;
  response.end();
  console.log('客户端有点小错误，404状态 已经发送 :) ');
}

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log('正在监听 ' + port + ' 中... \n ' +
  '可用浏览器打开 http://localhost:' + port);

