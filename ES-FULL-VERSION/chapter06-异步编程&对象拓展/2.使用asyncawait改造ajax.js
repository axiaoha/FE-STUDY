import ajax from './ajax.js'

function request(url) {
    return new Promise(resolve => {
        ajax(url, res => {
            resolve(res)
        })
    })
}
async function getData() {
    const res1 = await request('static/a.json')
    console.log(res1);
    const res2 = await request('static/b.json')
    console.log(res2);
    const res3 = await request('static/c.json')
    console.log(res3);
}
getData()