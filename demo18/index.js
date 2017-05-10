//事件循环机制实践
//[num]:num为执行顺序
//原文网址：http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651552169&idx=2&sn=451eb6181346ccd8293ba876b3458dea&chksm=8025ae68b752277ed927c53a4a9f526084b0c3dbc16c702369e2476a25f9745648a10fe1c2bd&mpshare=1&scene=23&srcid=0509qtjkSEmiqHPHnU3PBqiU#rd
    console.log(+new Date,'[1]:golb1',process);//1
    setTimeout(function() {
        console.log('[8]:timeout1'); //8
        process.nextTick(function() {
            console.log('[12]:timeout1_nextTick');//12
        })
        new Promise(function(resolve) {
            console.log('[9]:timeout1_promise');//9
            resolve();
        }).then(function() {
            console.log('[14]:timeout1_then') //14
        })
    })
     
    setImmediate(function() {
        console.log('[16]:immediate1');//16
        process.nextTick(function() {
            console.log('[20]:immediate1_nextTick');//20
        })
        new Promise(function(resolve) {
            console.log('[17]:immediate1_promise');//17
            resolve();
        }).then(function() {
            console.log('[22]:immediate1_then')//22
        })
    })
     
    process.nextTick(function() {
        console.log('[4]:glob1_nextTick');//4
    })
    new Promise(function(resolve) {
        console.log('[2]:glob1_promise');//2
        resolve();
    }).then(function() {
        console.log('[6]:glob1_then') //6
    })
     
    setTimeout(function() {
        console.log('[10]:timeout2');//10
        process.nextTick(function() {
            console.log('[13]:timeout2_nextTick');//13
        })
        new Promise(function(resolve) {
            console.log('[11-1]:timeout2_promise');//11-1
            resolve();
        }).then(function() {
            console.log('[15]:timeout2_then')//15
        });
         console.log('[11-2]:timeout2 end');//11-2
    })
     
    process.nextTick(function() {
        console.log('[5]:glob2_nextTick');//5
    })
    new Promise(function(resolve) {
        console.log('[3]:glob2_promise');//3
        resolve();
    }).then(function() {
        console.log('[7]:glob2_then')//7
    })
     
    //该方法用来把一些需要长时间运行的操作放在一个回调函数里,在浏览器完成后面的其他语句后,就立刻执行这个回调函数,
    setImmediate(function() {
        console.log('[18]:immediate2');//18
        process.nextTick(function() {
            console.log('[21]:immediate2_nextTick');//21
        })
        new Promise(function(resolve) {
            console.log('[19]:immediate2_promise');//19
            resolve();
        }).then(function() {
            console.log(+new Date,'[23]:immediate2_then')//23
        })
    })