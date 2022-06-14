const images = document.getElementsByTagName("img");
function getTop(e) {
  var T = e.offsetTop;
  while ((e = e.offsetParent)) {
    T += e.offsetTop;
  }
  return T;
}
function LazyLoad(imgs) {
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  Array.from(imgs).forEach((img) => {
    // const isIn = clientHeight + scrollTop > getTop(img);
    const isIn = img.getBoundingClientRect().top <= clientHeight;
    if (isIn && !img.src) {
      const src = img.dataset.src;
      img.src = src;
    }
  });
}
window.onload = window.onscroll = function (e) {
  console.log("onscroll");
  LazyLoad(images);
};
