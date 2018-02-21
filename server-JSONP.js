var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];

if(!port){
  console.log('请指定端口号 eg: \n node server.js 8888 ');
  process.exit(1);
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true);
  var path = request.url;
  var query = '';
  
  // console.log(parsedUrl.pathname);
  // console.log(path);
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?') + 1); }
  let _path = parsedUrl.pathname;
  var queryObject = parsedUrl.query;
  var method = request.method;

  // url 参数处理
  if(query.indexOf('=') >= 0){ queryData = query.substring(query.indexOf('=') + 1); }
  /******** 从这里开始看，上面不要看 ************/
console.log('-----------------------');
console.log('HTTP 路径为: ' + path);

// 初始化变量
let html,amount;

if(_path == '/' ){
  response.statusCode = 200;;
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  // 提取文件内容并初始化
  html = fs.readFileSync('./JSONP.html' , 'utf8');
  amount = fs.readFileSync('./db', 'utf8');
  html = html.replace('&&&amount&&&' , amount);

  response.write(html);
  response.end();
  console.log('文件已经发送');
}else if (_path === '/pay'){
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/javascript');
  // 提取数据内容并处理
  amount = fs.readFileSync('./db', 'utf8');
  amount -= 1;
  fs.writeFileSync('./db', amount);
  // 写入需要返回JS执行内容
  response.write(`
    ${queryData}.call(undefined ,'success');
  `);
  response.end();
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

