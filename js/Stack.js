
//定义一个栈的类   栈：后进先出
var Stack = function () {

    //创建栈的载体数组items
    var items = [];

    //push栈顶添加元素
    this.push = function (element) {
        items.push(element);
    }

    //pop移除栈顶元素
    this.pop = function () {
        return items.pop();
    }

    //peek获取栈顶
    this.peek = function () {

        return items[items.length - 1];
    }

    //isEmpty检查栈是否为空
    this.isEmpty = function () {
        return items.length === 0;
    }

    //clear清空栈
    this.clear = function () {
        items = [];
    }

    //size获取栈的大小
    this.size=function(){
        return items.length;
    }

    //获取整个栈
    this.getitems = function () {
        return items;
    }
}


//10进制转换为二进制
var DecToBin =function(Dec) {
    //创建一个栈变量存储数据
    var s=new Stack;
    //穿件一个变量存储每次计算的余数
    var remainder
    while(Dec>0){
        remainder=Dec%2;
        s.push(remainder);
        Dec=Math.floor(Dec/2);
    }
    var result="";
    while(!s.isEmpty()){
        result=result+s.pop();  // pop()操作原数组 返回移除的元素
    }
    return result;
}

/*
栈作用：在编程语言的编译器和内存中保存变量、方法调用。
看一下栈和函数的关系图 

// 1.先完成fn2,再完成fn1 还是 先完成fn1,再完成fn2？  先完成fn1(后入栈,后进先出，先完成)，再完成fn2(先入栈)
var fn1 = function() {
  return console.log('fn1执行完了');
};

var fn2 = function() {
  fn1();
  return console.log('fn2执行完了');
};

fn2();
*/

/*
递归
如果不停递归而不出栈，会导致栈溢出(内存泄露?)
var app = function() {
  app();
};
app();
*/