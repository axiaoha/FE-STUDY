// 你这个学期必须选修 numCourse 门课程，记为 0 到 numCourse-1 。
// 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们：[0,1]
// 给定课程总量以及它们的先决条件，请你判断是否可能完成所有课程的学习？

// 输入: 2, [[1,0]]
// 输出: true
// 解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。

// 输入: 2, [[1,0],[0,1]]
// 输出: false
// 解释: 总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。

// 这是一道经典的拓扑排序问题，所谓拓扑排序，举个例子：
// 比如吃自助火锅，有一套约定俗成的流程，首先先打开包装，然后放入粉、佐料、菜，然后在加水，最后盖上盖子；这是有一套先后顺序的，你不可能没打开包装就放佐料，也可以说这是有一套依赖关系的，盖盖子依赖加水，加水依赖放入粉、佐料、菜，继而依赖打开包装
// 这种关系通常使用有向图来表示，如果这套流程能够成功的帮助你最后吃到火锅（无环），那这种依赖顺序就是拓扑排序，即拓扑排序是针对【有向无环图】的

// 可以使用 邻接表 来表示有向图中各个节点的依赖关系，同时维护一个入度表，则入度表中入度为 0 的节点所表示的课程是可以立即开始学习的（没有先决条件条件或先觉条件已完成）
// 那么这题就很简单了:
// 创建一个队列，并将临接表中所有入度为 0 的节点放入队列中
// 若队列非空，则从队列中出队第一个节点，numCourse — （学习该课程），然后将将依赖该课程所有临接节点的入度减 1
// 若减 1 后节点入度为 0，则该课程又是可立即学习课程，将该节点添加到队尾
// 若减 1 后节点入度不为 0 ，则继续遍历下一节点
// 当队列为空，检查 numCourses === 0 （所有课程是否全部学习结束）即可

// function canFinish(numCourses, prerequisites) {
//   // 如果没有先决条件，即所有的课程均没有依赖关系
//   // 直接返回 true
//   if (prerequisites.length === 0) {
//     return true;
//   }

//   // 维护入度表
//   let inDegree = new Array(numCourses).fill(0);
//   // 维护临接表
//   let adj = new Map();

//   for (let e of prerequisites) {
//     inDegree[e[0]]++;
//     if (!adj.has(e[1])) adj.set(e[1], []);
//     let vEdge = adj.get(e[1]);
//     vEdge.push(e[0]);
//   }

//   let queue = [];
//   // 首先加入入度为 0 的结点
//   for (let i = 0; i < numCourses; i++) {
//     if (inDegree[i] === 0) {
//       queue.push(i);
//     }
//   }

//   while (queue.length > 0) {
//     // 从队首移除
//     var v = queue.shift();
//     // 出队一门课程
//     numCourses--;
//     if (!adj.has(v)) continue;
//     // 遍历当前出队结点的所有临接结点
//     for (let w of adj.get(v)) {
//       inDegree[w]--;
//       if (inDegree[w] === 0) {
//         queue.push(w);
//       }
//     }
//   }
//   return numCourses === 0;
// }

function canFinish(numCourses, prerequisites) {
  if (!prerequisites.length) return true;
  let inDegree = new Array(numCourses).fill(0);
  let adjacents = new Map();
  for (let e of prerequisites) {
    inDegree[e[0]]++;
    if (!adjacents.has(e[1])) adjacents.set(e[1], []);
    adjacents.get(e[1]).push(e[0]);
  }
  let queue = [];
  inDegree.forEach((item, index) => {
    if (item === 0) queue.push(index);
  });
  while (queue.length) {
    const q = queue.shift();
    numCourses--;
    if (!adjacents.has(q)) continue;
    for (let w of adjacents.get(q)) {
      inDegree[w]--;
      if (inDegree[w] === 0) queue.push(w);
    }
  }
  return !numCourses;
}

console.log(
  canFinish(5, [
    [4, 2],
    [4, 3],
    [2, 0],
    [2, 1],
  ])
);

console.log(
  canFinish(2, [
    [1, 0],
    [0, 1],
  ])
);
