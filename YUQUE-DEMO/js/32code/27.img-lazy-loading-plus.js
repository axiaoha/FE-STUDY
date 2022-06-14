const images = document.getElementsByTagName("img");
window.onload = function () {
  let observer = new IntersectionObserver((entries) => {
    console.log("callback", entries);
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        let ele = entry.target;
        if (!ele.src) {
          ele.src = ele.dataset.src;
          ele.removeAttribute("data-src");
        }
      }
    });
  });
  Array.from(images).forEach((item) => {
    observer.observe(item);
  });
};
