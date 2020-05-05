
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

var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key]
})

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

var _map = _curryr(_map), 
    _filter = _curryr(_filter)


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

function _pipe() {
    var fns = arguments;
    return function(arg) {
        return _reduce(fns, function(arg, fn){
            return fn(arg)
        }, arg)
    }
}

function _go(arg) {
    var fns = _rest(arguments)
    return _pipe.apply(null, fns)(arg)
}

module.exports = {
    _filter,
    _map,
    _curry,
    _curryr,
    _get,
    _each,
    _reduce,
    _pipe,
    _go
}