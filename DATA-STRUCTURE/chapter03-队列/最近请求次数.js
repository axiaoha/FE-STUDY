// 时间复杂度：O(n)
// 空间复杂度：O(n)
var RecentCounter = function () {
  this.p = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.p.push(t);
  while (this.p[0] < t - 3000) {
    this.p.shift();
  }
  return this.p.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
