export function log(type) {
  return function (target, name, descriptor) {
    let oldVal = descriptor.value;

    descriptor.value = function () {
      console.log(`日志上报 ${type}`);
      return oldVal.apply(this, arguments);
    };

    return descriptor;
  };
}
