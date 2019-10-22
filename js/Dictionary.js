
//字典  JS数据类型对象就是 字典 的一种实现
var Dictionary = function () {
    var items = {};

    // 检查键
    this.has = function (key) {
        return items.hasOwnProperty(key);
        //方法二
        //return key in items
    }

    this.set = function (key, value) {
        items[key] = value;
    }

    this.delete = function (key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    }
    
    //根据key获取值
    this.get = function (key) {
        if (this.has(key)) {
            return items[key];
        }
        return undefined;
    }

    // size方法
    Dictionay.prototype.size = function () {
        return this.keys().length
    }

    // clear方法
    Dictionay.prototype.clear = function () {
        this.items = {}
    }

    this.getItems = function () {
        return items;
    }

}

/*
例1：
var books = [
  {
    name: "西游记",
    price: 200
  },
  {
    name: "红楼梦",
    price: 199
  },
  {
    name: "水浒传",
    price: 132
  },
  {
    name: "三国演义",
    price: 128
  }
  ..      如果有一万条 需要要找的那本书又在最后  效率很低
]

例2：日本美丽街
  1         2       3       4         5     .......99
[姓氏..] [姓氏..] [姓氏..] [姓氏..] [姓氏..] [] [] [江户川] ...
找江户川他们家


存储麻烦  读取简单
*/

//字典的应用：哈希表(散列表)  好好看看图
var HashTable = function () {
    var items = [];
    //散列函数=>number=>items[number]
    //通过ascii码转换 a=>97
    var loseloseHashCode = function (key, value) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key[i].charCodeAt();
        }
        // 这里除以素数37是为了降低计算出重复hash的概率（后续会处理hash重复的问题）
        return hash % 37;
    }

    // 添加
    this.put=function(key,value){
        var position=loseloseHashCode(key);
        items[position]=value;
    }
    
    // 删除
    this.remove=function(key){
        items[loseloseHashCode(key)]=undefined;
    }

    // 读取
    this.get=function(key){
        return items[loseloseHashCode(key)];
    }

    // 全部
    this.getItems=function(){
        return items;
    }
}

/*

var ht = new HashTable()
ht.put('Jobs','Jobs@qq.com');
ht.put('Bob','Bob@qq.com');
console.log(ht.getItems())

//*/

// 为什么需要一个HashTable2 ？  
// 解决散列冲突：1.分离链表法 2.线性探查法

//单向链表  好好看看图
var LinkedList = function () {
  //初始化链表
  //链表头
  var head = null;
  //链表长度
  var length = 0;
  // 辅助类：节点
  var Node = function (element) {
      this.element = element;
      this.next = null;
  }

  //尾部添加元素
  this.append = function (element) {
      var node = new Node(element);
      // node = {
      //   element: element,
      //   next: null
      // }
      if (head == null) {
          // console.log(head)    // 第1次l.append(1)  null
          head = node;
          // console.log(head)    // 第1次l.append(1)  Node {element: 1, next: null}
      } else {
          // console.log(head)    // 第2次l.append(2)  Node {element: 1, next: Node {element: 2, next: null}}
          var current = head;  // 引用传递
          while (current.next) {
              current = current.next;
          }
          current.next = node;
      }
      length++;
  }

  //插入元素
  this.insert = function (position, element) {
      //越界
      if (position >= 0 && position < length) {

          var node = new Node(element);

          if (position > 0) {
              var current = head;             
              var previous = null;
              var index = 0;                
              while (index < position) {    // 每个节点都是是独立的对象，依靠next属性链接节点对象
                  previous = current;       // 上一个节点
                  current = current.next;   // 当前节点
                  index++;
              }

              previous.next = node;
              node.next = current;

          } else {
              var current = head;
              head = node;
              head.next = current;

          }
          length++;
      }
  }
  //从链表特定位置移除一项
  this.removeAt = function (position) {
      //越界
      if (position >= 0 && position < length) {
          if (position > 0) {
              var current = head;
              var previous = null;
              var index = 0;
              while (index < position) {
                  previous = current;
                  current = current.next;
                  index++;
              }
              previous.next = current.next;
          } else {
              var current = head;
              head = current.next;
          }
          length--;
          return current;
      }
  }

  //根据位置信息获取元素
  this.get=function(position){
      if(position>=0 && position<length){
          var current=head;
          var index=0
          while(index<position ){
              current=current.next;
              index++;
          }
          return current.element;
      }
      return null;
      
  }

  //获取元素索引
  this.indexOf = function (element) {
      var current = head;
      var index = 0;
      while (current) {
          if (element === current.element) {
              return index;
          }
          index++;
          current = current.next;
      }
      return -1;
  }

  //根据位置信息修改元素
  this.update=function(position,element){
      if(position>=0 && position<length){
          var current=head;
          var index=0;
          while(index<position){
              current=current.next;
              index++;
          }
          current.element=element
          return true
      }
      return -1;
  }

  //从指定位置删除
  this.remove = function (element) {
      return this.removeAt(this.indexOf(element));
  }
  //判断链表是否为空
  this.isEmpty = function () {
      return length === 0;
  }
  //获取链表长度
  this.size = function () {
      return length;
  }

  this.getHead = function () {
      return head;
  }
}

// 1.分离链表法
var HashTable1=function(){
    var table=[];
    var loseloseHashCode = function (key, value) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key[i].charCodeAt();
        }
        // 这里除以素数37是为了降低计算出重复hash的概率（后续会处理hash重复的问题）
        return hash % 37;
    }
    var Node=function(key,value){
        this.key=key;
        this.value=value;
    }
    // 增
    this.put=function(key,value){
        var position=loseloseHashCode(key);
        if(table[position]){
            table[position].append(new Node(key,value));
        }else{
            var l=new LinkedList();
            table[position]=l;
            table[position].append(new Node(key,value));
        }

    }

    // 查
    this.get=function(key){
        var position=loseloseHashCode(key);
        if(table[position]){

            //链表属性查找
            var current=table[position].getHead();
            while(current){
                if(current.element.key==key){
                    return current.element.value;
                }
                current=current.next;
            }
        }else{
            return undefined;
        }
    }

    // 删
    this.remove=function(key){
        var position=loseloseHashCode(key);
        if(table[position]){
          
            var current=table[position].getHead();
            
            while(current){
                if(current.element.key==key){
                    table[position].remove(current.element)
                    if(table[position].isEmpty()){
                      table[position]=undefined;
                    }
                    return true;
                }
                current=current.next
            }

        }else{
            return false;
        }
    }

    this.getTable=function(){
        return table;
    }
}
/*
var hl = new HashTable1()
hl.put('Donnie', 'Donnie@qq.com')
hl.put('Ana', 'Ana@qq.com') 
//*/

// 2.线性探查法
var HashTable2=function(){
  var table=[];
  var loseloseHashCode = function (key, value) {
      var hash = 0;
      for (var i = 0; i < key.length; i++) {
          hash += key[i].charCodeAt();
      }
      // 这里除以素数37是为了降低计算出重复hash的概率（后续会处理hash重复的问题）
      return hash % 37;
  }
  var Node=function(key,value){
      this.key=key;
      this.value=value;
  }
  // 增
  this.put=function(key,value){
      var position=loseloseHashCode(key);
      console.log('put时候的loseloseHashCode(key) =====' +position )
      if(table[position] === undefined){
          table[position] = new Node(key,value);
      }else{
          var index = position + 1;
          while(table[index] !== undefined) {
            index++
          }
          table[index] = new Node(key,value) 
      }

  }

  // 查
  this.get=function(key){
/*
假设：position  14
Donnie
Ana
anA
AAA

*/    // 参数的key哈希数码
      var position = loseloseHashCode(key);
      // if(position >-1){
      //     for(var i=position; table[i] != undefined;i++){
      //         if(loseloseHashCode(table[i].key) == position && table[i].key === key){
      //             return table[i].value
      //         }
             
      //     }
      // }

      if(position > -1){
        var i = position;
        while(table[i] != undefined) {
          if(loseloseHashCode(table[i].key) == position && table[i].key === key){
            return table[i].value
          }
          i++
        }
      }

      return undefined;

  }

  // 删
  this.remove=function(key){
      var position=loseloseHashCode(key);
      if(position > -1){
        var i = position;
        while(table[i] != undefined) {
          if(loseloseHashCode(table[i].key) == position && table[i].key === key){
            table[i]=undefined;
            return true
          }
          i++
        }
      }

      return false;
  }

  this.getTable=function(){
      return table;
  }
}

/*

var hl = new HashTable2()
hl.put('Donnie', 'Donnie@qq.com')
hl.put('Ana', 'Ana@qq.com') 
hl.put('anA', 'abc@qq.com') 
hl.put('AAA', 'AAA@qq.com') 
hl.put('BBB', 'BBB@qq.com') 

//*/

// 从根源上解决(重复)问题   djb2HashCode 算法
var HashTable3 = function () {
  var items = [];

  // 解决冲突问题： 数学层面问题
  var djb2HashCode = function(key) {
    var hash = 5381;
    for(var i = 0; i < key.length; i++) {
      hash = hash * 33 + key[i].charCodeAt()
    }
    return hash % 1013;
  }

  // 添加
  this.put=function(key,value){
      var position=djb2HashCode(key);
      items[position]=value;
  }
  
  // 删除
  this.remove=function(key){
      items[djb2HashCode(key)]=undefined;
  }

  // 读取
  this.get=function(key){
      return items[djb2HashCode(key)];
  }

  // 全部
  this.getItems=function(){
      return items;
  }
}

/*
var hl = new HashTable3()
hl.put('Donnie', 'Donnie@qq.com')
hl.put('Ana', 'Ana@qq.com') 
hl.put('naA', 'naA@qq.com') 
hl.put('AAA', 'AAA@qq.com') 
hl.getItems();
// 278: "Donnie@qq.com"
// 421: "AAA@qq.com"
// 845: "naA@qq.com"
// 925: "Ana@qq.com"
// length: 926

//*/