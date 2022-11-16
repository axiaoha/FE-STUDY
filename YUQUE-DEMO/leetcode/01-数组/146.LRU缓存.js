// 请你设计并实现一个满足  LRU (Least Recently Used最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

// 示例：
// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]
// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = Object.create(null);
    this.keys = [];
  }
  put(key, value) {
    if (this.cache[key]) {
      this.cache[key] = value;
      this.removeKey(key);
      this.keys.push(key);
    } else {
      this.cache[key] = value;
      this.keys.push(key);
      if (this.keys.length > this.capacity) {
        this.removeCache();
      }
    }
    console.log("put:", this.cache, this.keys);
  }
  get(key) {
    if (this.keys.includes(key)) {
      this.removeKey(key);
      this.keys.push(key);
      console.log("get:", key, this.cache[key]);
      return this.cache[key];
    }
    console.log("get:", key, this.cache[key] || -1);
    return -1;
  }
  removeKey(key) {
    const index = this.keys.indexOf(key);
    index > -1 && this.keys.splice(index, 1);
  }
  removeCache() {
    const key = this.keys[0];
    this.cache[key] = null;
    this.removeKey(key);
  }
}
const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1); // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2); // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1); // 返回 -1 (未找到)
lRUCache.get(3); // 返回 3
lRUCache.get(4); // 返回 4
