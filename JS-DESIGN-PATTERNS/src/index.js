class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    alert(this.name);
  }
}

let p = new Person("axiaoha");
p.getName();
