process.stdin.resume();
process.stdin.setEncoding('utf8');
console.warn('[3]time0:',+new Date)//1524994631511
process.stdin.on('data',function(text){
    // console.error(' text>>',text);
    process.stdout.write(text.toUpperCase());
    console.warn('[7]time1:',+new Date)//1524994631516
});

console.warn('[10]time2:',+new Date)//1524994631513
