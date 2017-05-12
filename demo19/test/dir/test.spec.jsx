// 命令行运行
//node_modules/.bin/_mocha demo19/test/**/*.js --compilers js:babel-core/register
//会运行test目录下面的所有js测试用例,即包括01.spec.js 也保持test/dir目录下面的所有js测试用例
// require('should');
// const mylib = require('../../index').default;
import 'should'
import mylib from '../../index';

describe('My First Test[test.spec.jsx]', () => {
      console.warn("test.spec.js-->",+new Date);
      it('should get "Hello Tmall"', function (){
        console.log('it[test.spec.js]',+new Date)
        mylib().should.be.eql('Hello Tmall');
      });
});