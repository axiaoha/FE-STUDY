class People {
    constructor(name, age) {
        this.name = name
        this.age = age

        // this._sex = 'female'
        this._sex = 1
    }
    get sex() {
        // return this._sex

        if (this._sex === 1) {
            return 'female'
        } else if (this._sex === 0) {
            return 'male'
        } else {
            return 'error'
        }
    }
    set sex(val) {
        // this.sex = val //这样写会陷入死循环，因此新增一个属性
        // this._sex = val
        if (val === 0 || val === 1) {
            this._sex = val
        }
    }
    showName() {
        console.log('name:', this.name);
    }

    // 静态方法
    static getCount() {
        return 1
    }

    //静态属性,以前时只能声明静态方法，现在也支持声明静态属性了
    static count = 2
}
let p1 = new People('axiaoha', 23)
console.log(p1);
console.log(People.getCount()); //1
console.log('before', People.count); //2
console.log(typeof People); //'function' class只是一个语法糖，本质上还是基于原型的构造函数
People.count = 3
console.log('after', People.count); //3

// console.log('before', p1.sex);
// p1.sex = 'male'
// console.log('after', p1.sex);

// 当在获取或者操作属性时需要加入业务逻辑时可以使用get和set来操作属性
console.log('before', p1.sex); //'before female'
p1.sex = 0
console.log('after', p1.sex); //'after male'


class Coder extends People {
    constructor(name, age, technology) {
        super(name, age)
        this.technology = technology
    }
    showTechnology() {
        console.log('technology:', this.technology);
    }
}
let coder = new Coder('axiaoha', 23, 'FE')
console.log(coder);
coder.showTechnology() //'technology: FE'
coder.showName() //'name: axiaoha'
console.log(coder.sex); //'female'

// EXPAND-01：
// 放到expand.md里面进一步探索，es6的继承可以做到继承父类的静态方法和静态属性
console.log(Coder.getCount()); //1
console.log(Coder.count); //3