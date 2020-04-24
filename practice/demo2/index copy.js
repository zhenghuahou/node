const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    // response.end('hello ...')
    const { url, method ,headers} = request

    response.writeHead(200,{
        'Content-Type': 'application/json'
    })
    return response.end(JSON.stringify({
        name : 'lao22wang'
    }))
    if (url === '/' && method === 'GET'){
        // 静态页面服务
        fs.readFile('index.html',(err,data) => {
            // response.statusCode = 200
            response.setHeader('Content-Type','text/html')
            response.end(data)
        })
    }else if(url === '/users' && method === 'GET'){
        // Ajax服务
        response.writeHead(200,{
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify({
            name : 'laowang'
        }))
    }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
        // 图片文件服务
        console.warn(' headers.accept:',headers.accept,' method:',method,' url:',url)
        fs.createReadStream('./'+url).pipe(response)
    }

})
server.listen(3000)
