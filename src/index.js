/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var i = 0;i < array.length; i++) {
        fn(array[i], i, array)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var newArr = [];

    for ( var i = 0; i < array.length; i++) {        
        newArr.push(fn(array[i], i, array))
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
    var result;

    if (typeof initial == 'undefined') {
        for (let i = 1; i < array.length; i++) {   
            if (i === 1) { 
                result = fn(array[0], array[i], i, array);
            } else {
                result = fn(result, array[i], i, array);
            }
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            if (i === 0) {
                result = fn(initial, array[i], i, array);
            } else {
                result = fn(result, array[i], i, array);
            }
        }
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var arr = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key.toUpperCase())
        }
    }

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    if (typeof from == 'undefined' && typeof to == 'undefined') {
        let newArr = [];

        for (let i = 0; i < array.length; i++) {
            newArr.push(array[i]);            
        }

        return newArr;
    }

    if (typeof from !== 'undefined' && typeof to == 'undefined') {        
        let newArr = [];
        
        if (from < 0) {         
            if (from < -array.length) {
                from = 0;
            } else {
                from = from + array.length;
            }
        }
        
        for (let i = from; i < array.length; i++) {
            newArr.push(array[i]);
        }
        
        return newArr;
    }
    if (typeof from !== 'undefined' && typeof to !== 'undefined') {       
        let newArr = [];

        if (to > array.length) {
            to = array.length;
        }
        if (to < 0) {
            to = to + array.length;
        }
        if (from < 0 ) {
            from = 0;
        }
        for (let i = from; i < to; i++) {
            newArr.push(array[i]);
        }
        
        return newArr;
    }

}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
