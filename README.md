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

### 4. 커링, curry, curryr

### 5. reduce

### 6. 파이프라인, _go, _pipe, 화살표 함수

### 7. 다형성 높이기, _keys, 에러

## Section 3. 컬렉션 중심 프로그래밍