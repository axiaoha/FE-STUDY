const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.name,
      },
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {
    // 把每一个文件都通过模板转换到目标文件
    const templates = [
      "README.md",
      "babel.config.js",
      "src/main.js",
      "src/App.vue",
      "src/components/HelloWorld.vue",
      "src/assets/logo.png",
      "public/index.html",
      "public/favicon.ico",
    ];
    templates.forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      );
    });
  }
};
