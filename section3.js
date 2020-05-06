const { 
    _filter,
    _map,
    _curry,
    _curryr,
    _get,
    _each,
    _reduce,
    _pipe,
    _go,
    _keys,
    _values,
    _identity,
    _pluck
 } = require('./js/_')
const partial = require('./js/partial')

var users = [
    { id: 10, name: 'ID', age: 36 },
    { id: 20, name: 'BJ', age: 32 },
    { id: 30, name: 'JM', age: 32 },
    { id: 40, name: 'PJ', age: 27 },
    { id: 50, name: 'HA', age: 25 },
    { id: 60, name: 'JE', age: 26 },
    { id: 70, name: 'JI', age: 31 },
    { id: 80, name: 'MP', age: 23 },
    { id: 90, name: 'FP', age: 13 },
]

// ## Section 3. 컬렉션 중심 프로그래밍

// ### 1. 수집하기 - map, values, pluck
console.log(
    _map(users, function(user) {
        return user.name
    })
)


//      1. values

// function _values(data) {
//     return _map(data, function(val) {
//         return val
//     })
// }

// function _values(data) {
//     return _map(data, _identity)
// }

// var _values = _map(_identity)

// function _identity(val) {
//     return val
// }
// 호이스팅

console.log(users[0])
console.log(_keys(users[0]))
console.log(_values(users[0]))

var a = 10
console.log(_identity(a))

console.log(_map(_identity)(users[0]))

//      2. pluck

// function _pluck(data, key) {
//     return _map(data, function(obj) {
//         return obj[key]
//     })
// }




console.log(_pluck(users, 'age'))
console.log(_pluck(users, 'name'))
console.log(_pluck(users, 'id'))
// [33, 22, 11, ...]

// ### 2. 거르기 - reject, compact
//      1. reject
//      2. compact

// ### 3. 찾아내기 - find, find_index, some, every
//      1. find 만들기
//      2. find_index
//      3. some
//      4. every

// ### 4. 접기 - reduce, min_by, max_by
//      1. min, max, min_by, max_by
//      2. group_by, push
//      3. count_by, inc

// ### 5. 접기 - group_by, count_by, 조합