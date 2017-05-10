//事件循环机制实践
//[num]:num为执行顺序
    console.log(+new Date,'[1]:golb1',process);//1
    setTimeout(function() {
        setTimeout(function(){
            console.warn('[after 15 && before 16] timeout3',+new Date);
        },0)
        setTimeout(function(){
            console.warn('【24】timeout3',+new Date);//顺序偶尔会出现在'[after 15 && before 16] timeout3'之后，绝大部分都是最后一个输出
        },10)
        console.log('[8]:timeout1',+new Date); //8
        process.nextTick(function() {
            console.log('[12-1]:timeout1_nextTick',+new Date);//12-1
        })
        process.nextTick(function() {
            console.log('[12-2]:timeout1_nextTick',+new Date);//12-2
        })
       
        new Promise(function(resolve) {
            console.log('[9]:timeout1_promise',+new Date);//9
            resolve();
        }).then(function() {
            console.log('[14]:timeout1_then',+new Date) //14
        })
        process.nextTick(function() {
            console.log('[12-3]:timeout1_nextTick',+new Date);//12-3
        })
        process.nextTick(function() {
            console.log('[12-4]:timeout1_nextTick',+new Date);//12-4
        })
    },0)
     
    setImmediate(function() {
        console.log('[16]:immediate1',+new Date);//16
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

     setTimeout(function() {
        console.log('[10]:timeout2',+new Date);//10
        process.nextTick(function() {
            console.log('[13]:timeout2_nextTick');//13
        })
        new Promise(function(resolve) {
            console.log('[11-1]:timeout2_promise');//11-1
            resolve();
        }).then(function() {
            console.log('[15-1]:timeout2_then',+new Date)//15-1
        })
        //.then(function() {
        //     console.warn('[15-2]:timeout2_then2',+new Date)//15-2
        // }).then(function() {
        //     console.warn('[15-3]:timeout2_then3',+new Date)//15-3
        // });
         console.log('[11-2]:timeout2 end!!!!!!!!!');//11-2
    })