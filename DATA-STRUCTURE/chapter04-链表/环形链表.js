// https://leetcode-cn.com/problems/linked-list-cycle/
var hasCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next && fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
};

// https://hongyangyu.github.io/algorithm/2017/09/04/%E5%BF%AB%E6%85%A2%E6%8C%87%E9%92%88/
// https://leetcode-cn.com/problems/linked-list-cycle-lcci/solution/kuai-man-zhi-zhen-zheng-ming-bi-jiao-yan-jin-by-ch/
