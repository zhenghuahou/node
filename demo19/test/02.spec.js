import 'should';
import mylib,{add} from '../index';

describe('My First Test[02.spec.js]', () => {
      console.warn("02.spec.js-->",+new Date)
      it('should get 2', function (){
        this.timeout(100000);
        console.log('it[02.spec.js]',+new Date,);
        mylib().should.be.eql('Hello Tmall');
      });
      // before(function() {
      //       console.info(+new Date,' before:',before);
      //   // runs before all tests in this block
      // });

      // after(function() {
      //    console.info(+new Date,' after:',after);
      //   // runs after all tests in this block
      // });
});