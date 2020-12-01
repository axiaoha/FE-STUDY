let p = new Promise((resolve,reject)=>{
    // 会立即执行
    console.log(1)
    resolve()//state:fulfilled
    // reject()//status:rejected
})
console.log(2)
console.log("p",p);
p.then(res=>{
    console.log(3);
    return 3
},err=>{
    console.log("err",err);
})