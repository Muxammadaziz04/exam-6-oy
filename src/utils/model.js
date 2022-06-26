const path = require('path')
const fs = require('fs')

const read = (fileName) => {
    const file = fs.readFileSync(path.join(__dirname, '../', 'database', `${fileName}.json`), 'utf-8')
    return JSON.parse(file)
}

const write = (fileName, data) => {
    fs.writeFileSync(path.join(__dirname, '../', 'database', `${fileName}.json`), JSON.stringify(data, null, 4))
    return true
}

const snakeToCamel = (str) => str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

const camelToSnake = (str) => str.split(/(?=[A-Z])/).join('_').toLowerCase();

function changeCase(func, data, ...arr){
    if(Array.isArray(data)){

        return data.map(obj => {
            arr.forEach(str => {
                obj[func(str)] = obj[str]
                delete obj[str]
            })
            return obj
        })

    } else {
        arr.forEach(str => {
            data[func(str)] = data[str]
            delete data[str]
        })
        return data
    }


}


module.exports = {
    read, write, snakeToCamel, camelToSnake, changeCase
}