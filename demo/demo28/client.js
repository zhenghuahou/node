const http = require('http');
const util = require('util');
const da = require('http-server');

console.warn('   @@@',process.argv[2],' ###process.argv[3]:',process.argv[3], ' process.argv[4]',process.argv[4]);
console.warn(' ~~~~~~~~~~tt da:',da,'\n  process.argv:', process.argv);

// var opt = {
//     host: '127.0.0.1',
//     port: 3001,
//     method: 'GET',
// };
// var req = http.request(opt, function(res) {
//     util.log('STATUS:', res.statusCode);
//     res.setEncoding('utf8');
//     var resultText = '';
//     res.on('data', (chunk) => {
//         util.log('[client.js] data:',chunk)
//         resultText += chunk;
//     });
//     res.on('end', () => {
//         util.log('[client.js] end:')
//         util.log(resultText);
//     });
// });

// req.on('error', (e) => {
//     util.log(e);
// });

// util.log("start request...")
// req.end();