// throw "Async Comp Error";
export default {
  setup(props, { emit }) {
    onMounted(() => {
      console.log("mounted 1");
    });
    onMounted(() => {
      console.log("mounted 2");
    });
    return () => {
      return {
        type: "div",
        children: "Async Comp",
      };
    };
  },
};
