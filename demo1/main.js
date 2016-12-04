
var fs = require('fs');
// console.log('fs:',fs);
// var data = fs.readFileSync('in.txt');
//阻塞代码实例
var t1=+new Date();
var data = fs.readFileSync('json.txt');

//非阻塞代码实例,异步调用
var data2 = fs.readFile('json.txt',function(error,data){
	if (error){
		console.error('error------->:',error);
		console.log('error.stack--->:',error.stack);
      return;
	}
    console.log('----------------',data);//Buffer ....,
    console.log('----------------',typeof data);//Object
    console.log('++++++++++++++++',data.toString());//{"aa":["sdddssd"],"bb":["892394829342394792399","23894723984729374932874"]}
    console.log('++++++++++++++++',typeof data.toString());//string
    var d = JSON.parse(data.toString());
    console.log(' d:',d,typeof d,d.aa,typeof d.aa);
    /*d: { aa: [ 'sdddssd' ],
 bb: [ '892394829342394792399', '23894723984729374932874' ] } object [ 'sdddssd'] object
	*/
    var result = d.bb.map(function(item,index,array){
    	// console.log(' ****:',item,index,array);
    	return +new Date();
    });
    console.log('t1:',t1,' result:',result);
});
var json = JSON.parse(data.toString());
console.log('data2:',data2,typeof data2);//data2: undefined undefined
console.log(data);//Buffer ....
// console.log(typeof data);//object
console.log(typeof  data.toString());//string
console.log('<------end!');