// npm init
// npm add yeoman-generator
// 此文件作为Generator的核心入口
// 需要导出一个继承自yeoman generator的类型
// yeoman generator在工作时会自动调用在此类型中定义的一些生命周期方法
// 在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    // Yeoman在询问用户环节会自动调用此方法
    // 在此方法中可以调用父类的prompt()方法发出对用户的命令行询问
    return this.prompt({
      type: "input",
      name: "name",
      message: "your project name",
      default: this.appname, // appname 为项目生成目录名称
    }).then((answers) => {
      // answers => {name:"user input value"}
      this.answers = answers;
    });
  }
  writing() {
    // Yeoman自动在生成文件阶段调用此方法
    // 这里尝试往项目目录中写入文件
    // ------------手动创建每一个文件------------
    // this.fs.write(this.destinationPath("temp.txt"), Math.random().toString());
    // // 然后通过npm link将该模块链接到全局范围，使之成为一个全局模块包，让yeoman在工作的时候能够找到这个模块
    // // 进入my-project目录，在命令行通过 yo 运行 generator，输入yo sample，会发现my-project目录下生成了一个内容为随机字符串的temp.txt文件
    // ------------通过模板方式写入文件到目标目录------------
    // // 模板文件路径
    // const tmpl = this.templatePath("foo.txt");
    // // 输出目标路径
    // const output = this.destinationPath("foo.txt");
    // // 模板数据上下文
    // const context = { title: "hello axiaoha", success: true };
    // ------------接收用户输入数据------------
    // 模板文件路径
    const tmpl = this.templatePath("bar.html");
    // 输出目标路径
    const output = this.destinationPath("bar.html");
    // 模板数据上下文
    const context = this.answers;
    this.fs.copyTpl(tmpl, output, context);
  }
};
