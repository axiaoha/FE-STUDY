class Scheduler {
  queue = [];
  maxCount = 2;

  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }

  request() {
    if (!this.queue || !this.queue.length) {
      return;
    }
    this.queue
      .shift()()
      .then(() => {
        this.request();
      });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

// 1、其实1、2两个任务开始执行
// 2、500ms时，2任务执行完毕，输出2，任务3开始执行
// 3、800ms时，3任务执行完毕，输出3，任务4开始执行
// 4、1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 5、1200ms时，4任务执行完毕，输出4
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

scheduler.taskStart();
// output: 2 3 1 4
