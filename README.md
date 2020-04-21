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