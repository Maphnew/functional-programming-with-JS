
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

module.exports = {
    _filter,
    _map,
    _curry,
    _curryr,
    _get,
    _each
}