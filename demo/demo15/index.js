process.stdin.on('readable', function () {
    var buf = process.stdin.read(1);
    console.dir(buf);
    var bb =  process.stdin.read(7);
    console.info(' bb-->');
    console.dir(bb);
    //  process.stdin.read(0);
});

// var Readable = require('stream').Readable;
// var rs = new Readable;
// var c = 97;
// rs._read = function () {
//     rs.push(String.fromCharCode(c++));
//     if (c > 'z'.charCodeAt(0)) {
//         rs.push(null);
//     }
// };
// rs.pipe(process.stdout);