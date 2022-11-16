// 观察者模式
class Subject {
  constructor() {
    this.observerList = [];
  }
  addObserver(observer) {
    this.observerList.push(observer);
  }
  removeObserver(observer) {
    const index = this.observerList.findIndex((o) => o.id === observer.id);
    this.observerList.splice(index, 1);
  }
  notifyObservers(message) {
    this.observerList.forEach((observer) => {
      observer.notified(message);
    });
  }
}

class Observer {
  constructor(id, subject) {
    this.id = id;
    if (subject) {
      subject.addObserver(this);
    }
  }
  notified(message) {
    console.log(this.id, "got message", message);
  }
}

const subject = new Subject();

const observer1 = new Observer("1", subject);

const observer2 = new Observer("2");
subject.addObserver(observer2);

subject.notifyObservers("Hello from subject");

subject.removeObserver(observer1);

subject.notifyObservers("Hello again");
