/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    var div = document.createElement('DIV');

    div.classList.add('draggable-div');

    var randomWidth = document.documentElement.clientWidth * Math.random();
    var randomHeight = document.documentElement.clientHeight * Math.random();

    div.style.width = `${randomWidth}px`;
    div.style.height = `${randomHeight}px`;

    var randomLeft = randomWidth * Math.random() / 2;
    var randomTop = randomHeight * Math.random() / 2;

    div.style.left = `${randomLeft}px`;
    div.style.top = `${randomTop}px`;

    if (parseInt(div.style.width) + parseInt(div.style.left) > document.documentElement.clientWidth) {
        div.style.left = 0;
    }

    div.style.position = 'absolute';
    var randomOpacity = Math.random() * 1;
    var randomColor = Math.random() * 255 + 1;

    div.style.backgroundColor = `rgba(0,0,${randomColor}, ${randomOpacity})`

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', function (evt) {       
        evt.preventDefault()
        
        var startCoordinates = {
            x: evt.clientX,
            y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var limit = {
                top: document.documentElement.clientTop,
                left: document.documentElement.clientLeft,
                right: document.documentElement.clientWidth,
                bottom: document.documentElement.clientHeight
            };
            
            var shift = {
                x: startCoordinates.x - moveEvt.clientX,
                y: startCoordinates.y - moveEvt.clientY
            };

            startCoordinates = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            target.style.top = target.offsetTop - shift.y + 'px';
            target.style.left = target.offsetLeft - shift.x + 'px';      
            
            if (target.offsetTop <= limit.top) {
                target.style.top = `${limit.top}px`
            } else if (target.offsetTop + target.offsetHeight > limit.bottom) {
                target.style.top = limit.bottom - target.offsetHeight + 'px';
            }

            if (target.offsetLeft <= limit.left) {
                target.style.left = `${limit.left}px`
            } else if (target.offsetLeft + target.offsetWidth > limit.right) {
                target.style.left = limit.right - target.offsetWidth + 'px'
            }
        }  

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);        
                        
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
