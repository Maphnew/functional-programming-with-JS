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
    _keys
 } = require('./js/_')
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

// 3. 다형성

console.log(
    [1,2,3,4].map((val) => val * 2)
)

console.log(
    [1,2,3,4].filter((val) => val % 2)
)

// method => array 만 사용가능

// // $('div') => array like 객체
// console.log(document.querySelectorAll('body'))
// // [body]
// console.log(document.querySelectorAll('*'))
// // [html, head, ...]

// console.log(
//     document.querySelectorAll('*').map(function(node) {
//         return node.nodeName;
//     })
// )
// // ERROR! because 'document.querySelectorAll('*')' is not an array!
// console.log(
//     _map(document.querySelectorAll('*'), function(node) {
//         return node.nodeName;
//     })
// )
// // [html, head, ...]

// 순수함수는 method 보다 다형성면에서 장점을 갖는다.

// 내부 다형성
_map([1,2,3,4], function(v) {
    return v + 10
})
// callback 함수: 모든 수행 후 다시 돌려줄 때
// predicate 함수: 조건을 return하는 함수
// iter: 반복 수행 함수
// mapper: mapping 하는 함수

// 3. 커링
// 1. _curry, _curryr

// _.js 로 옮김
// function _curry(fn) {
//     return function(a,b) {
//         return arguments.length == 2 ? fn(a,b) : function(b) { return fn(a,b) }
//     }
// }

// function _curryr(fn) {
//     return function(a, b) {
//         return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a)}
//     }
// }

var add = _curry(function(a,b) {
    return a + b
})

var add10 = add(10)
var add5 = add(5)
console.log(add10(5))

console.log(add(5)(3))
console.log(add5(3))
console.log(add(10)(3))

console.log(add(1,2))

var sub = _curryr(function(a, b) {
    return a - b;
})

console.log( sub(10, 5))
var sub10 = sub(10)
console.log(sub10(5))

// 2. _get 만들어 좀 더 간단하게 하기

// _.js 로 옮김
// var _get = _curryr(function(obj, key) {
//     return obj == null ? undefined : obj[key]
// })

console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30 }),
        _get('name')
    )
)
// [ 'ID', 'BJ', 'JM', 'JI' ]
console.log(
    _map(
        _filter(users, function(user) { return user.age < 30 }),
        _get('age')
    )
)
// [ 27, 25, 26, 23 ]

var user1 = users[0]
console.log(user1.name)
console.log(_get(user1, 'name'))
console.log(_get('name')(user1))

var get_name = _get('name')
console.log(get_name(user1))
console.log(get_name(users[3]))

// console.log(users[10].name) // error
console.log(_get(users[10], 'name'))

console.clear()
// 4. _reduce 만들기

console.log(
    _reduce([1, 2, 3, 4], add, 0)
) // 10

// memo = add(0,1)
// memo = add(memo ,2)
// memo = add(memo ,3)
// return memo

// add(add(add(0,1),2),3)

console.log(
    _reduce([1, 2, 3], add, 10)
) // 16

// 세번째 인자가 없을 때
console.log(
    _reduce([1, 2, 3], add)
) // 6

console.log(
    _reduce([1, 2, 3, 4], add, 10)
) // 6

// 5. 파이프라인 만들기
    // 1. _pipe

var f1 = _pipe(
    function(a) {return a+1},
    function(a) {return a*2},
    function(a) {return a*a}
)

console.log( f1(1) )

    // 2. _go
_go(1,
    function(a) {return a+1},
    function(a) {return a*2},
    function(a) {return a*a},
    console.log
)

    // 3. users에 _go 적용
console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30 }),
        _get('name')
    )
)

console.log(
    _map(
        _filter(users, function(user) { return user.age < 30 }),
        _get('age')
    )
)

_go(users,
    function(users) {
        return _filter(users, function(user) {
            return user.age >= 30
        })
    },
    function(users) {
        return _map(users, _get('name'))
    },
    console.log
)

//
_go(users,
    _filter(function(user) { return user.age >= 30 }),
    _map(_get('name')),
    console.log
)

_go(users,
    function(users) {
        return _filter(users, function(user) {
            return user.age < 30
        })
    },
    function(users) {
        return _map(users, _get('age'))
    },
    console.log
)

//
_go(users,
    _filter(user => user.age < 30),
    _map(_get('age')),
    console.log
)


console.log(_map([1,2,3], function(val) {return val * 2}))

console.log(
    _map(
        function(val) {return val * 2}
    )([1,2,3])
)

    // 4. 화살표 함수 간단히

var a = function(user) {return user.age >= 30};
var a = user => user.age >= 30;

var add = function(a, b) { return a + b }
var add = (a, b) => a + b
var add = (a, b) => {
    return a + b
}
var add = (a, b) => ({ val: a + b })

// ### 7. 다형성 높이기, _keys, 에러
// 함수형 프로그래밍에서는 예외적인 데이터가 들어오는 것에 대해 다형성을 높이는 것으로 해결하기도 함
// 예를 들어 _each에 null이나 undefined가 들어올 때 에러가 나지 않도록 처리

// 6. _each의 외부 다형성 높이기
    // 1. _each에 null 넣어도 에러 안나게
_each(null, console.log)
console.log(_map(null, function(v) {return v})) // []
console.log(_filter(null, function(v) {return v})) // []

_go([1,2,3,4], 
    _filter(function(v) {return v % 2;}),
    _map(function(v) {return v * v;}),
    console.log
) // [ 1, 9 ]

_go(null, 
    _filter(function(v) {return v % 2;}),
    _map(function(v) {return v * v;}),
    console.log
) // []

// 예외처리하지 않음.
// 에러 내지 않음.
// ORM 이나 MVC패턴 framework 사용할 때 underscore, Lodash를 사용하는 것이 대부분

    // 2. _keys 만들기
    // 3. _keys에서도 _is_object인지 검사하여 null 에러 안나게
console.log(_keys({name: 'ID', age:33}))
console.log(_keys([1,2,3,4]))
console.log(_keys(10))
console.log(_keys(null))



    // 4. _each 외부 다형성 높이기

_each({
    13: 'ID',
    19: 'HD',
    29: 'YD'
}, function(name) {
    console.log(name)
})
// ID
// HD
// YD

console.log(_map({
    13: 'ID',
    19: 'HD',
    29: 'YD'
}, function(name) {
    return name.toLowerCase()
})) // [ 'id', 'hd', 'yd' ]

_go(
    {
        13: 'ID',
        19: 'HD',
        29: 'YD'
    },
    _map(function(name) {
        return name.toLowerCase()
    }),
    console.log
) // [ 'id', 'hd', 'yd' ]

_go(
    users,
    _map(function(user){
        return user.name
    }),
    _map(function(name) {
        return name.toLowerCase()
    }),
    console.log
)
// [
//     'id', 'bj', 'jm',
//     'pj', 'ha', 'je',
//     'ji', 'mp'
//   ]

_go(
    null,
    _map(function(user){
        return user.name
    }),
    _map(function(name) {
        return name.toLowerCase()
    }),
    console.log
) // []

_go(
    {
        1: users[0],
        3: users[2],
        5: users[4]
    },
    console.log
)
// {
//     '1': { id: 1, name: 'ID', age: 36 },
//     '3': { id: 3, name: 'JM', age: 32 },
//     '5': { id: 5, name: 'HA', age: 25 }
//  }

_go(
    {
        1: users[0],
        3: users[2],
        5: users[4]
    },
    _map(function(user) {
        return user.name.toLowerCase()
    }),
    console.log
) // [ 'id', 'jm', 'ha' ]