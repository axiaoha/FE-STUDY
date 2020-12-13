// ES10之前err 是必须的参数， 在 ES10 可以省略这个参数
// try {
//     // tryCode
// } catch (err) {
//     // catchCode
// }

const validJSON = json => {
    try {
        JSON.parse(json)
        return true
    } catch (err) {
        return false
    }
}

const json = '{"name":"axiaoha", "age": "23"}'
console.log(validJSON(json))