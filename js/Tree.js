/*

二叉搜索树：1.每个节点只有2个字节点
           2.左侧字节点 < 自己  右侧字节点
           3.定位和字典一样很快
//*/
var Tree = function () {
    //初始化根节点
    var root = null;
    //创建节点类
    var Node = function (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    // 非空树，插入方法(根节点, 新节点)   递归隐藏的出口就是不调用它自己，(默认return一个undefind)栈顶函数开始出栈
    // 搜索函数辅助函数
    var insertNode = function (node, newNode) {
        if (newNode.value > node.value) { // 往右边走
            
            if (node.right === null) {
                node.right = newNode;
            } 
            else {
                insertNode(node.right, newNode);
            }

        } 
        else if (newNode.value < node.value) {  // 往左走

            
            if (node.left === null) {
                node.left = newNode
            } 
            else {
                insertNode(node.left, newNode);
            }
        }
    }

    //插入节点
    this.insert = function (value) {
        var node = new Node(value);
        //加入为空，则将新节点赋值给根节点
        if (root === null) {
            //空树
            root = node;
        } else {
            //加入树不为空，则执行插入方法
            insertNode(root, node);
        }

    }
    //搜索节点
    this.search = function () {

    }

    // 遍历节点辅助函数：这儿的进栈出栈图 好好体会一下
    var traverse = function (node, callback) {
        if (node == null) return
        // callback(node.value);          // 8 2 3 9            前序遍历

        traverse(node.left, callback);    // 先把这个递归执行完

        // callback(node.value);          // 2 3 8 9            中序遍历

        traverse(node.right, callback);   // 再把右边

        callback(node.value);             // 在自己  3 2 9 8    后序遍历 => 适合目录找文件

    }
    //遍历节点
    this.traverse = function (callback) {
        traverse(root, callback);
    }

    // 最小值辅助函数 1.空树 2.非空树
    var min = function(node) {
      if(node === null) return null;
      while(node && node.left) {
        node = node.left;
      }
      return node;
    }
    // 获取最小值
    this.min = function() {
      return min(root)
    }

    // 最大值辅助函数 1.空树 2.非空树
    var max = function(node) {
      if(node === null) return null;
      while(node && node.right) {
        node = node.right;
      }
      return node;
    }
    // 获取最大值
    this.max = function() {
      return max(root)
    }
    
    // 删除节点辅助函数 搜索
    var findMinNode = function(node) {
      if(node == null) return null;

      while(node && node.left) {
        node = node.left;
      }

      return node;
    }

    // 删除节点辅助函数
    var removeNode = function(node, value) {
      if(node == null) return null;

      if(value > node.value) {  // 继续向右查找
        node.right = removeNode(node.right, value);
        return node;
      }
      else if(value < node.value) { // 继续向左查找
        node.left = removeNode(node.left, value);
        return node;
      }
      else {  // value == node.value  执行删除过程
        if(node.left == null && node.right == null) {  // 叶节点条件
          node = null;
          return node;
        }

        if(node.left == null && node.right) { // 只有一个子节点条件
          return node.right;
        }

        else if(node.right == null && node.left) { // 只有一个子节点条件
          return node.left;
        }

        // 有两个字节点的条件
        var aux = findMinNode(node.right);  // aux 查找到的最小子节点
        node.value = aux.value;
        node.right = removeNode(node.right, aux.value);
        return node;

      }
    }

    // 删除节点
    // 1.移除叶节点(没有字节点了)
    // 2.移除只有一个字节点的节点：移除 用替换替换上来
    // 3.移除有两个字节点的情况：
    //    3.1：left(3)   移除4  right(5)  放3 5上去都可以   3/5的left/right都是null的情况
    //    3.2：不是上面的情况，替换右侧最小节点  
    this.remove = function(value) {
      root = removeNode(root, value);
    }

    this.getRoot = function () {
        return root;
    }
}

/*

var t = new Tree();
t.insert(8)
t.insert(2);
t.insert(3);
t.insert(9);


var print = function (value) {
    console.log(value)
}
t.traverse(print)

//*/


/*
// remove
var t = new Tree();

t.insert(11);
t.insert(8)
t.insert(4)
t.insert(9);
t.insert(3);
t.insert(5);
t.insert(10);



//*/