// 集合的特性&无重复性，
var MySet = function () {

    var items = {};
    // has检查是否存在 return boolean
    this.has = function (value) {
        return items.hasOwnProperty(value);   // 指示对象自身属性中是否具有指定的属性
    }
    // 添加元素
    this.add = function (value) {
        if (!this.has(value)) {
            items[value] = value;
            return value;
        }
        return false;
    }
    // 移除集合某一元素
    this.remove = function () {
        if (!this.has(value)) {
            delete items[value];
            return items[value];
        }
        return null;
    }
    // 清空集合
    this.clear = function () {
        items = {}
    }
    // 集合长度
    this.size = function () {
        return Object.keys(items).length    // keys(obj) 返回一个由一个给定对象的自身可枚举属性组成的数组
    }

    // 获取集合元素
    this.value = function () {
        var values = [];
        for (var i in items) {
            if (items.hasOwnProperty(i)) {
                values.push(items[i])
            }
        }
        return values;
    }

    this.getItems = function () {
        return items;
    }
    // 并集  AB去重之后的合并
    this.union=function(otherSet){
        //新建一个集合存放合并后的集合
        var resultSet=new MySet();
        
        //1.把自己的值提取出来
        for(var i in items){
            if(items.hasOwnProperty(i)){
                resultSet.add(items[i])
            }
        
        //2.把另一只集合的值提取出来
        arr=otherSet.value();
        for(var i =0;i<arr.length;i++){
            resultSet.add(arr[i])
        }
        return resultSet;
        }
    }

    // 交集 AB相同部分
    this.intersection=function(otherSet){
        var resultSet=new MySet();
        
        var arr=this.value();
        for(var i =0;i<arr.length;i++){
            if(otherSet.has(arr[i]) && !resultSet.has(arr[i])){
                resultSet.add(arr[i])
            }
        }

        return resultSet;
    }

    // 差集 difference A - (AB交集)
    this.difference=function(otherSet){
        var resultSet=new MySet();

        var arr=this.value();
        for(var i =0 ;i<arr.length;i++){
            if(!otherSet.has(arr[i]) && !resultSet.has(arr[i])){
                resultSet.add(arr[i])
            }
        }
        return resultSet;
    }

}

var s1=new MySet();
s1.add(1);
s1.add(2);
s1.add(3);
var s2=new MySet();
s2.add(2);
s2.add(3);
s2.add(4);

/*
// 并集
var unionuTestVal = s1.union(s2)
console.log(unionuTestVal.value())          //  (4) [1, 2, 3, 4]
//*/

/*
// 交集
var intersectionTestVal = s1.intersection(s2)
console.log(intersectionTestVal.value())    //  (2)[2,3]
//*/


/*
// 差集
var diffTestVal = s1.difference(s2)
console.log(diffTestVal.value())            // [1]
//*/


/* 
//es6中的额外的set方法    set集合
var s=new Set;
s.add(1);
s.add(2);
s.add(3);
s.add(3);
s.add(2);
s.add(1);
// console.log(s)     // Set(3) {1, 2, 3}

//forEach  set
// s.forEach(function(value1,value2,value3){
//     console.log("value1-"+value1);//set元素的值
//     console.log("value2-"+value2);//set元素的指针
//     console.log("value3-实例本身");//set实例对象s
//     console.log(value3)
//     console.log('-----------------------------------')
// })

// forEach arr 就是(item,index,arr) 一样的


//entries迭代器
var interator=s.entries();            // 获得迭代器
console.log(interator.next().value);  // [1,1]
console.log(interator.next().value);  // [2,2]
console.log(interator.next().value);  // [3,3]
console.log(interator.next().value);  // undefined

//*/


/*
//es6中Set的合并
var a=new Set([1,2,3])
var b=new Set([4,3,2])
//交集
var union=new Set([...a,...b])
//并集
var intersect=new Set([...a].filter(x=>b.has(x)))
// 等同于
// var intersect=new Set([...a].filter(function(x){
//      return b.has(x) //数组的filter方法，条件函数，如果存在b则返回值
// }))
//差集
var difference=new Set([...a].filter(x=>!b.has(x)));

//*/

/*
//WeakSet  弱集合
//Weakset只能添加对象作为元素
*/


/*

Set的强引用和WeakSet的弱引用  
  WeakSet的add的obj之后，obj=null会影响weakSet；而Set的强引用不不会，需要set.delete..

*/