// 命令行运行
//node_modules/.bin/_mocha demo19/test/**/*.js --compilers js:babel-core/register
//会运行test目录下面的所有js测试用例,即包括01.spec.js 也保持test/dir目录下面的所有js测试用例
// require('should');
// const mylib = require('../../index').default;
import 'should'
import mylib from '../../index';
import fetch from 'node-fetch';

describe('My First Test[test.spec.js]', () => {
      console.warn("test.spec.js-->",+new Date);
      it('should get "Hello Tmall#￥%"', function (){
        console.log('it[test.spec.js]',+new Date)
        mylib().should.be.eql('Hello Tmall');
      });
      it('测试应该5000毫秒后结束￥￥￥', function(done) {
          // console.log(' this done:',+new Date);
          this.timeout(6700);
          var x = true;
          var f = function() {
            x = false;
            x.should.be.not.ok;
            // console.log('----->this done:',+new Date);
            done(); // 通知Mocha测试结束
          };
          setTimeout(f, 4000);
      });

    it('异步请求应该返回一个对象', function() {
      return fetch('https://api.github.com')
        .then(function(res) {
            // console.log(' fetch:',fetch);
          return res.json();
        }).then(function(json) {
            // console.log(' json:',json,typeof json);
          (json).should.be.type('object');
        });
    });
    before(function() {
        // 在本区块的所有测试用例之前执行
        console.log('<<<<<在本区块的所有测试用例之前执行')
    });
    beforeEach(function() {
        // 在本区块的每个测试用例之前执行
        console.log('在本区块的每个测试用例之前执行>>>>>>>>')
    });
});



// describe.skip("Hook示例", function(){
// describe.only("Hook示例", function(){
describe("Hook示例", function(){
  var foo = false;

  beforeEach(function(done){
    setTimeout(function(){
      foo = true;
      done();
    }, 4000);
  });

  it("全局变量异步修改应该成功", function(){
    foo.should.be.eql(true);
  });
});