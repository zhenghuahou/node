//ES6测试
import 'should'
import mylib,{add} from '../index';

describe('My First Test[01.spec.js]', () => {
      console.warn("01.spec.js-->",+new Date)
      it('should get "Hello Tmall"', function (){
        // this.timeout(100000);
        console.log('it[01-1.spec.js]',+new Date,mylib().should)
        mylib().should.be.eql('Hello Tmall');
      });
       it('should get "Hello Tmall"', function (){
        console.log('it[01-2.spec.js]',+new Date)
        mylib().should.be.eql('Hello Tmall');
      });
      before(function() {
        console.info(' before[01.spec.js]:',+new Date);
        // runs before all tests in this block
      });

      after(function() {
        console.info(' after[01.spec.js]:',+new Date);
        // runs after all tests in this block
      });
});