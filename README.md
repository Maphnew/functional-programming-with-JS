# 자바스크립트로 알아보는 함수형 프로그래밍

## Section 01. 함수형 프로그래밍 개요
### 1. 함수형 프로그래밍 정의, 순수 함수
- 함수형 프로그래밍은 성공적인 프로그래밍을 위해 부수 효과를 미워하고 조합성을 강조하는 프로그래밍 패러다임이다.
- 부수효과를 미워한다 => 순수 함수를 만든다.
- 조합성을 강조한다 => 모듈화 수준을 높인다.
- 순수 함수 => 오류를 줄이고 안전성을 높인다.
- 모듈화 수준이 높다 => 생산성을 높인다.


```JS
// 순수함수
// 동일한 인자 동일한 결과
function add(a, b) {
    return a + b;
}

console.log( add(10, 5))
```
```JS
// c가 변하면 함수의 결과가 달라짐 => 순수함수가 아님
var c = 10;
function add2(a,b) {
    return a + b + c;
}
console.log( add2( 10,2 )) // 22
console.log( add2( 10,3 ))
console.log( add2( 10,4 ))
c = 20;
console.log( add2( 10,2 )) // 32
console.log( add2( 10,3 ))
console.log( add2( 10,4 ))
```
```JS
// 부수효과가 있는 함수
var c = 20;
function add3(a, b) {
    c = b;
    return a + b;
}
console.log('c:', c) // 20
console.log(add3(20, 30))
console.log('c:', c) // 30
console.log(add3(20, 30))
console.log(add3(20, 30))
```

```JS
var obj1 = { val : 10 }
function add4(obj, b) {
    obj.val += b;
}
console.log( obj1.val ) // 10
add4(obj1, 20)
console.log( obj1.val ) // 30
```

```JS
// 다시 순수 함수
var obj1 = { val : 10 }
function add5(obj, b) {
    return { val: obj.val + b}
}

console.log( obj1.val ) // 10
var obj2 = add5(obj1, 20)
console.log( obj1.val ) // 10
console.log( obj2.val ) // 30
```
- 순수함수는 평가시점에 구애받지 않고 같은 결과를 낸다.
- 순수함수를 통해 조합성을 강조함
---
> 일급 함수   
- 함수를 값으로 정의할 수 있다.

### 2. 일급함수, add_maker, 함수로 함수 실행하기
- 함수를 값으로 다룰 수 있는 개념
```JS
var f1 = function(a) { return a * a }
console.log(f1)
// function(a) { return a * a }

var f2 = add
console.log(f2)
// function add(a, b) {
//     return a + b;
// }
```
```JS
function f3(f) {
    return f()
}

console.log( f3(function() { return 10 }) )
// 10
console.log( f3(function() { return 20 }) )
// 20
```
- add_maker
```JS
function add_make(a) {
    return function(b) {
        return a + b
    }
}
```
- Closer & Pure Function
- A pure function is a function where the return value is only determined by its input values, without observable side effects.
```JS
// Closer & Pure function
    return function(b) {
        return a + b
    }
```
- Uses
```JS
var add10 = add_maker(10)

console.log( add10(20) )

var add5 = add_maker(5)
var add15 = add_maker(15)

console.log( add5(10) )
console.log( add15(10) )
```

```JS
function f4(f1,f2,f3) {
    return f3(f1() + f2())
}

console.log(
    f4(
        function() {return 2},
        function() {return 1},
        function(a) {return a * a}
    )
)
// 9
```
### 3. 요즘 개발 이야기, 함수형 프로그래밍 정의

> 요즘 개발 이야기   
- 재미 / 실시간성 : 라이브 방송, 실시간 댓글, 협업, 메신저
- 독창성 / 완성도 : 애니메이션, 무한 스크롤, 벽돌형태 리스트
- 더 많아져야하는 동시성 : 비동기 I/O, CSP, Actor, STM ...
- 더 빨라야하는 반응성 / 고가용성 : ELB, Auto Scaling, OTP Supervisor ...
- 대용량 / 정확성 / 병렬성 : MapReduce, Clojure Reducers ...
- 복잡도 / MSA / ... : 많아지고 세밀해지는 도구들

> 함수형 프로그래밍 FP   
- 좋아지는 하드웨어 성능
- 좋아지는 컴파일러
- 함수형 프로그래밍 기술
- 좋아지는 분산 / 리액티브 환경
- 동시성 + 병렬성 관련 기술
- 성공적인 적용 사례와 영향

> 함수형 프로그래밍은
- 애플리케이션, 함수의 구성요소, 더 나아가서 언어 자체를 함수처럼 여기도록 만들고, 이러한 함수 개념을 가장 우선순위에 놓는다.
> 함수형 사고방식은 
- 문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것

    - 마이클 포거스 [클로저 프로그래밍의 즐거움]에서 ...

#### * 객체 지향 프로그래밍과 함수형 프로그래밍
```JS
// 데이터(객체) 기준
duck.moveLeft()
duck.moveRight()
dog.moveLeft()
dog.moveRight()

// 함수 기준
moveLeft(dog)
moveRight(duck)
moveLeft({ x:5, y:2 })
moveRight(dog)
```

- 기존 개발자들이 어떻게 전환해 왔는가? / 함수형 프로그래밍 아이디어

## Section 2. 함수형으로 전환하기

### 1. 회원 목록, map, filter
```JS
const _ = require('./js/_')
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
function _filter(list, predi) {
    var new_list = []
    for (const element of list) {
        if (predi(element)) {
            new_list.push(element)
        }
    }
    return new_list
}
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

function _map(list, mapper) {
    var new_list = []
    for (const element of list){
        new_list.push(mapper(element))
    }
    return new_list
}

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
```
### 2. each
- filter, map 함수 옮기기 => _.js
- 모듈화
- each로 filter, map 함수의 중복을 제거
```JS
// ./js/_.js
function _filter(list, predi) {
    var new_list = []
    _each(list, function(val) {
        if (predi(val)) new_list.push(val)
    })
    // for (const element of list) {
    //     if (predi(element)) {
    //         new_list.push(element)
    //     }
    // }
    return new_list
}

function _map(list, mapper) {
    var new_list = []
    _each(list, function(val){
        new_list.push(mapper(val))
    })
    // for (const element of list){
    //     new_list.push(mapper(element))
    // }
    return new_list
}

function _each(list, iter) {
    for (const element of list){
        iter(element)
    }
    return list
}

module.exports = {
    _filter,
    _map
}
```

### 3. 다형성
- 외부 다형성
- array_like, arguments, document.querySelectorAll
```JS
console.log(
    [1,2,3,4].map((val) => val * 2)
)

console.log(
    [1,2,3,4].filter((val) => val % 2)
)

// method => array 만 사용가능

```
- 순수함수는 method 보다 다형성면에서 장점을 갖는다.
```html
<script>
// $('div') => array like 객체
console.log(document.querySelectorAll('body'))
// [body]
console.log(document.querySelectorAll('*'))
// [html, head, ...]

console.log(
    document.querySelectorAll('*').map(function(node) {
        return node.nodeName;
    })
)
// ERROR! because 'document.querySelectorAll('*')' is not an array!
console.log(
    _map(document.querySelectorAll('*'), function(node) {
        return node.nodeName;
    })
)
// [html, head, ...]
</script>
```
- 내부 다형성
- predicate, iteratee, mapper
```JS
_map([1,2,3,4], function(v) {
    return v + 10
})
// callback 함수: 모든 수행 후 다시 돌려줄 때
// predicate 함수: 조건을 return하는 함수
// iter: 반복 수행 함수
// mapper: mapping 하는 함수
```

### 4. 커링, curry, curryr
- 커링: 함수와 인자를 다루는 기법
- 함수에 인자를 하나씩 적용해 나가다가 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법
- curryr 함수는 인자가 하나씩 들어올 때 나중에 들어온 인자부터 적용시키는 함수(r means right)

```JS
// 3. 커링
// 1. _curry, _curryr

function _curry(fn) {
    return function(a,b) {
        return arguments.length == 2 ? fn(a,b) : function(b) { return fn(a,b) }
    }
}

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a)}
    }
}

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
var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key]
})

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
```
### 5. reduce

- reduce 함수: 누산기, 누적 계산, 배열의 요소를 차례대로 원하는 함수에 넣어 누적값을 만들고 하나의 값을 리턴

```JS
// 4. _reduce 만들기

var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1)
}

function _reduce(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0]
        // list = list.slice(1) // slice method는 array에만 사용되는 method / html 참조
        list = _rest(list)
    }
    // return iter(iter(iter(0,1),2),3)
    _each(list, function(val) {
        memo = iter(memo, val)
    })
    return memo
}

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
```
- slice method를 array like 배열에 사용하기 위한 방법
- Array.prototype.slice.call 

```html

<script>
    var a = document.querySelectorAll('*')
    // a.slice(1)
    // error

    var slice = Array.prototype.slice;
    console.log(slice.call(a, 2))
    // (5) [meta, body, script, script, script]
    
    console.log(a)
    // NodeList(7) [html, head, meta, body, script, script, script]

    console.log(slice.call(a, 2).constructor)
    // ƒ Array() { [native code] }

    var a = { 0:1, 1:20, 2: 30, length:3 }
    console.log(a)
    // {0: 1, 1: 20, 2: 30, length: 3}
    console.log(a[0])
    // 1
    console.log(a[1])
    // 20
    console.log(a[2])
    // 30
    console.log(slice.call(a, 1))
    // (2) [20, 30]
    

</script>
```
### 6. 파이프라인, _go, _pipe, 화살표 함수

#### 1. _pipe 함수: _reduce와 같지만 arguments를 함수들로 받음
```JS
function _pipe() {
    var fns = arguments;
    return function(arg) {
        return _reduce(fns, function(arg, fn){
            return fn(arg)
        }, arg)
    }
}
```

```JS
var f1 = _pipe(
    function(a) {return a+1},
    function(a) {return a*2},
    function(a) {return a*a}
)

console.log( f1(1) )
```

#### 2. _go 함수
```JS
function _go(arg) {
    var fns = _rest(arguments)
    return _pipe.apply(null, fns)(arg)
}
```

```JS
_go(1,
    function(a) {return a+1},
    function(a) {return a*2},
    function(a) {return a*a},
    console.log
)
```
#### 3. users에 _go 적용
1. original one
```JS
console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30 }),
        _get('name')
    )
)
```
2. _go
```JS
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
```
3. _map과 _filter에 curryr 적용
```JS
var _map = _curryr(_map), 
    _filter = _curryr(_filter)
```
```JS
_go(users,
    _filter(function(user) { return user.age >= 30 }),
    _map(_get('name')),
    console.log
)
```
#### 4. 화살표 함수 간단히
```JS
var a = function(user) {return user.age >= 30};
var a = user => user.age >= 30;

var add = function(a, b) { return a + b }
var add = (a, b) => a + b
var add = (a, b) => {
    return a + b
}
var add = (a, b) => ({ val: a + b })
```
### 7. 다형성 높이기, _keys, 에러

- 함수형 프로그래밍에서는 예외적인 데이터가 들어오는 것에 대해 다형성을 높이는 것으로 해결하기도 함
- 예를 들어 _each에 null이나 undefined가 들어올 때 에러가 나지 않도록 처리

- _each error 잡기
```JS
var _length = _get('length')

function _each(list, iter) {
    for (var i = 0, len = _length(list); i < len; i++){
        iter(list[i])
    }
    return list
}
```
#### 1. _each에 null 넣어도 에러 안나게
```JS
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
```
#### 2. _keys 만들기 & 3. _keys에서도 _is_object인지 검사하여 null 에러 안나게
```JS
function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}
```
```JS
    // 2. _keys 만들기
    // 3. _keys에서도 _is_object인지 검사하여 null 에러 안나게
console.log(_keys({name: 'ID', age:33}))
console.log(_keys([1,2,3,4]))
console.log(_keys(10))
console.log(_keys(null))

```
#### 4. _each 외부 다형성 높이기
```JS
function _each(list, iter) {
    var keys = _keys(list)

    for (var i = 0, len = keys.length; i < len; i++){
        iter(list[keys[i]])
    }
    return list
}
```
```JS
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
```

## Section 3. 컬렉션 중심 프로그래밍
- 컬렉션 중심 프로그래밍의 4가지 유형과 함수

1. 수집하기 - map, values, pluck
2. 거르기 - filter, reject, compact, without
3. 찾아내기 - find, find_index, some, every
4. 접기(축약) - reduce, min_by, max_by
5. 접기(축약) - group_by, count_by, 조합

### 1. 수집하기 - map, values, pluck

```JS
console.log(
    _map(users, function(user) {
        return user.name
    })
)
```
- 1. values
```JS
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

var _values = _map(_identity)

function _identity(val) {
    return val
}
```
```JS
console.log(users[0])
console.log(_keys(users[0]))
console.log(_values(users[0]))

var a = 10
console.log(_identity(a))

console.log(_map(_identity)(users[0]))
```
```JS
//      2. pluck

// function _pluck(data, key) {
//     return _map(data, function(obj) {
//         return obj[key]
//     })
// }

function _pluck(data, key) {
    return _map(data, _get(key))
}
```
```JS
console.log(_pluck(users, 'age'))
console.log(_pluck(users, 'name'))
console.log(_pluck(users, 'id'))
// [33, 22, 11, ...]

```


### 2. 거르기 - reject, compact
### 3. 찾아내기 - find, find_index, some, every
### 4. 접기 - reduce, min_by, max_by
### 5. 접기 - group_by, count_by, 조합
