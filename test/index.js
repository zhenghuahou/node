// import {babylon} from 'babylon';
import * as babylon from "babylon";
var bn = require("babylon");

// require("babylon").parse("code", {
//   // parse in strict mode and allow module declarations
//   sourceType: "module",

//   plugins: [
//     // enable jsx and flow syntax
//     "jsx",
//     "flow"
//   ]
// });

 
let code = `
     let a = 1, b = 2;
     function sum(a, b){
          return a + b;
     }
 
    sum(a, b);
`;
// console.warn(' code:',code,'babylon:',babylon,' bn:',bn,babylon===bn);
let ast = bn.parse(code);
console.log('ast:',ast);


module.exports = function(babel) {
  var t = babel.types;
  var types = t;
  console.warn(' --------------->',arguments);
  let specified;
  let libraryObjs;
  let selectedMethods;
  let moduleArr;
  return {
    visitor: {
    	 Program() {
          specified = Object.create(null);
          libraryObjs = Object.create(null);
          selectedMethods = Object.create(null);
          moduleArr = Object.create(null);
        },

        ArrayExpression: function(path) {
        	console.warn(' path:',path);
		  path.replaceWith(
		    t.callExpression(
		      t.memberExpression(t.identifier('mori'), t.identifier('vector')),
		      path.node.elements
		    )
		  );
		},
		ImportDeclaration(path, { opts }) {
		  const { node } = path;
          const { value } = node.source;
			console.warn(' ImportDeclaration-->path:',path,arguments);
			console.error(' opts:',opts,' value:',value)
			 node.specifiers.forEach(spec => {
			 	console.warn(' ******8 types.isImportSpecifier(spec):',types.isImportSpecifier(spec),spec)
              if (types.isImportSpecifier(spec)) {
                specified[spec.local.name] = spec.imported.name;
                moduleArr[spec.imported.name] = value;
              } else {
                libraryObjs[spec.local.name] = value;
              }
            });
			 console.warn(' specified:',specified,'\n moduleArr:',moduleArr,' \n:',libraryObjs)
		}
    }
  };
};
 