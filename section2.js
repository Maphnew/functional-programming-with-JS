const { _filter, _map } = require('./js/_')
const partial = require('./js/partial')

var users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 },
]

// 1. 명령형 코드

    // 1. 30세 이상인 users를 거른다.
var temp_users = []
for (var i =0; i < users.length; i ++){
    if (users[i].age >= 30) {
        temp_users.push(users[i])
    }
}

console.log(temp_users)

    // 2. 30세 이상인 users의 names를 수집한다.
var names = []
for (var i = 0; i < temp_users.length; i++){
    names.push(temp_users[i].name)
}
console.log(names)
// [ 'ID', 'BJ', 'JM', 'JI' ]

    // 3. 30세 미만인 users를 거른다.
var temp_users = []
for (var i =0; i < users.length; i ++){
    if (users[i].age < 30) {
        temp_users.push(users[i])
    }
}
    
    console.log(temp_users)
    // 4. 30세 미만인 users의 ages를 수집한다.
var ages = []
for (var i = 0; i < temp_users.length; i++){
    ages.push(temp_users[i].age)
}
console.log(ages)
// [ 27, 25, 26, 23 ]

// 2. _filter, _map으로 리팩토링
// function _filter(list, predi) {
//     var new_list = []
//     for (const element of list) {
//         if (predi(element)) {
//             new_list.push(element)
//         }
//     }
//     return new_list
// }
// 응용형 함수, 고차함수

var over30 =  _filter(users, function(user) { return user.age >= 30 })
console.log('over30:', over30)
// _filter:  [
//     { id: 1, name: 'ID', age: 36 },
//     { id: 2, name: 'BJ', age: 32 },
//     { id: 3, name: 'JM', age: 32 },
//     { id: 7, name: 'JI', age: 31 }
//   ]


var under30 =  _filter(users, function(user) { return user.age < 30 })
console.log('under30:', under30)

// _filter:  [
//     { id: 4, name: 'PJ', age: 27 },
//     { id: 5, name: 'HA', age: 25 },
//     { id: 6, name: 'JE', age: 26 },
//     { id: 8, name: 'MP', age: 23 }
//   ]

console.log(
    _filter([1,2,3,4], function(num) {return num % 2 }),
    _filter([1,2,3,4], function(num) {return !(num % 2) })
)
// [ 1, 3 ] [ 2, 4 ]

// function _map(list, mapper) {
//     var new_list = []
//     for (const element of list){
//         new_list.push(mapper(element))
//     }
//     return new_list
// }

var names = _map(over30, function(user) { return user.name})
console.log('names:',names)
// names: [ 'ID', 'BJ', 'JM', 'JI' ]

var ages = _map(under30, function(user) { return user.age})
console.log('ages:',ages)
// ages: [ 27, 25, 26, 23 ]

console.log(_map([1,2,3], function(num) {return num * 2}))
// [ 2, 4, 6 ]

console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30 }),
        function(user) {return user.name}
    )
)
// [ 'ID', 'BJ', 'JM', 'JI' ]
console.log(
    _map(
        _filter(users, function(user) { return user.age < 30 }),
        function(user) {return user.name}
    )
)
// [ 'PJ', 'HA', 'JE', 'MP' ]

