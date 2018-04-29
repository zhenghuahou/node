 before: 1495016770454
it[01-1.spec.js] 1495016770461 Assertion {
  obj: 'Hello Tmall',
  anyOne: false,
  negate: false,
  params: { actual: 'Hello Tmall' } }
it[01-2.spec.js] 1495016770584
 after: 1495016770585
it[02.spec.js] 1495016770586
<<<<<在本区块的所有测试用例之前执行
在本区块的每个测试用例之前执行>>>>>>>>
it[test.spec.js] 1495016770588
在本区块的每个测试用例之前执行>>>>>>>>
在本区块的每个测试用例之前执行>>>>>>>>
# TOC
   - [My First Test[01.spec.js]](#my-first-test01specjs)
   - [My First Test[02.spec.js]](#my-first-test02specjs)
   - [My First Test[test.spec.js]](#my-first-testtestspecjs)
   - [Hook示例](#hook)
<a name=""></a>
 
<a name="my-first-test01specjs"></a>
# My First Test[01.spec.js]
should get "Hello Tmall".

```js
// this.timeout(100000);
console.log('it[01-1.spec.js]', +new Date(), (0, _index2.default)().should);
(0, _index2.default)().should.be.eql('Hello Tmall');
```

should get "Hello Tmall".

```js
console.log('it[01-2.spec.js]', +new Date());
(0, _index2.default)().should.be.eql('Hello Tmall');
```

<a name="my-first-test02specjs"></a>
# My First Test[02.spec.js]
should get 2.

```js
this.timeout(100000);
console.log('it[02.spec.js]', +new Date());
(0, _index2.default)().should.be.eql('Hello Tmall');
```

<a name="my-first-testtestspecjs"></a>
# My First Test[test.spec.js]
should get "Hello Tmall#￥%".

```js
console.log('it[test.spec.js]', +new Date());
(0, _index2.default)().should.be.eql('Hello Tmall');
```

测试应该5000毫秒后结束￥￥￥.

```js
// console.log(' this done:',+new Date);
this.timeout(6700);
var x = true;
var f = function f() {
  x = false;
  x.should.be.not.ok;
  // console.log('----->this done:',+new Date);
  done(); // 通知Mocha测试结束
};
setTimeout(f, 4000);
```

异步请求应该返回一个对象.

```js
return (0, _nodeFetch2.default)('https://api.github.com').then(function (res) {
  // console.log(' fetch:',fetch);
  return res.json();
}).then(function (json) {
  // console.log(' json:',json,typeof json);
  json.should.be.type('object');
});
```

<a name="hook"></a>
# Hook示例
全局变量异步修改应该成功.

```js
foo.should.be.eql(true);
```

