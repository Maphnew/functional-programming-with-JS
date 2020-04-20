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