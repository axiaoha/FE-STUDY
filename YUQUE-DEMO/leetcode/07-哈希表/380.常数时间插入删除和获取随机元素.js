class RandomizedSet {
  constructor() {
    this.set = new Set();
  }
  insert(val) {
    if (this.set.has(val)) {
      return false;
    }
    this.set.add(val);
    return true;
  }
  remove(val) {
    if (!this.set.has(val)) {
      return false;
    }
    this.set.delete(val);
    return true;
  }
  getRandom() {
    const random = parseInt(Math.random() * this.set.size);
    return [...this.set][random];
  }
}

// 初始化一个空的集合。
let randomSet = new RandomizedSet();

// 向集合中插入 1 。返回 true 表示 1 被成功地插入。
console.log(randomSet.insert(1));

// 返回 false ，表示集合中不存在 2 。
console.log(randomSet.remove(2));

// 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
console.log(randomSet.insert(2));

// getRandom 应随机返回 1 或 2 。
console.log(randomSet.getRandom());

// 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
console.log(randomSet.remove(1));

// 2 已在集合中，所以返回 false 。
console.log(randomSet.insert(2));

// 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
console.log(randomSet.getRandom());
