function ajax(url, succesCallback, failCallback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      succesCallback(xmlhttp.responseText);
    } else if (xmlhttp.readyState === 4 && xmlhttp.status !== 200) {
      failCallback && failCallback(xmlhttp.statusText);
    }
  };
}

function getPromise(url) {
  return new Promise((resolve, reject) => {
    ajax(
      url,
      (res) => {
        console.log(res);
        resolve();
      },
      (err) => {
        reject(err);
      }
    );
  });
}

// getPromise("static/a.json")
//   .then((res) => {
//     console.log("a成功");
//     return getPromise("static/b.json");
//   })
//   .then((res) => {
//     console.log("b成功");
//     return getPromise("static/c.json");
//   })
//   .then((res) => {
//     console.log("c成功");
//   });

// getPromise("static/aa.json")
//   .then(
//     (res) => {
//       console.log("a成功");
//       return getPromise("static/b.json");
//     },
//     (err) => {
//       console.log(err); //不会阻塞then的执行，因为这里返回的是一个空的promise对象
//     }
//   )
//   .then((res) => {
//     console.log("b成功");
//     return getPromise("static/c.json");
//   })
//   .then((res) => {
//     console.log("c成功");
//   });

getPromise("static/aa.json")
  .then((res) => {
    console.log("a成功");
    return getPromise("static/b.json");
  })
  .then((res) => {
    console.log("b成功");
    return getPromise("static/c.json");
  })
  .then((res) => {
    console.log("c成功");
  })
  .catch((err) => {
    console.log(err); //不糊进入到第二第三个then了
  });

// new Promise((resolve, reject) => {
//   ajax("static/a.json", (res) => {
//     console.log(res);
//     resolve();
//   });
// })
//   .then((res) => {
//     console.log("a成功");
//     return new Promise((resolve, reject) => {
//       ajax("static/b.json", (res) => {
//         console.log(res);
//         resolve();
//       });
//     });
//   })
//   .then((res) => {
//     console.log("b成功");
//     return new Promise((resolve, reject) => {
//       ajax("static/c.json", (res) => {
//         console.log(res);
//         resolve();
//       });
//     });
//   })
//   .then((res) => {
//     console.log("c成功");
//   });
