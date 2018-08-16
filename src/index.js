/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    seconds *=1000
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, seconds);
    })
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise((resolve, reject) => {
        const URL_LOAD = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        let xhr = new XMLHttpRequest();

        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            if (xhr.status > 400) {
                reject();
            }                
            resolve(xhr.response.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            }));
        });

        xhr.addEventListener('error', () => reject());        
        xhr.addEventListener('abort', () => reject());        

        xhr.open('GET', URL_LOAD);
        xhr.send();        
    })
}

export {
    delayPromise,
    loadAndSortTowns
};
