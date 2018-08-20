/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

addButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let cookie = createCookie();

    createTr(cookie.name, cookie.value)
});

function createCookie() {
    const cookieName = addNameInput.value;
    const cookieValue = addValueInput.value;
    
    document.cookie = `${cookieName}=${cookieValue}`

    addNameInput.value = '';
    addValueInput.value = '';

    return { name: cookieName, value: cookieValue }
}

function createTr(cookieName, cookieValue) {
    let tr = document.createElement('TR');
    let tdCookieName = document.createElement('TD');
    let tdCookieValue = document.createElement('TD');
    let tdCookieDeletBtn = document.createElement('TD');
    let deleteCookieBtn = document.createElement('BUTTON');

    deleteCookieBtn.innerText = 'Удалить';
    deleteCookieBtn.id = cookieName;
    deleteCookieBtn.addEventListener('click', (evt)=>{
        evt.preventDefault();
        let cookieName = evt.target.id;

        deleteCookie(cookieName);
        document.getElementById(cookieName).remove()

    })
  
    tdCookieName.innerText = cookieName;
    tdCookieValue.innerText = cookieValue;
    tdCookieDeletBtn.appendChild(deleteCookieBtn);

    tr.appendChild(tdCookieName);
    tr.appendChild(tdCookieValue);
    tr.appendChild(tdCookieDeletBtn);

    tr.id = cookieName;
    listTable.appendChild(tr)
}

function getDefaultCookie() {
    let defaultCookie = document.cookie.split('; ').reduce((prev, current)=>{
        const [name, value] = current.split('=');
      
        prev[name] = value;

        return prev;
    }, {})  

    return defaultCookie;
}

function deleteCookie(cookieName) {
    let cookieDate = new Date(); 

    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = cookieName += '=; expires=' + cookieDate.toGMTString();
}

function isMatching(full, chunk) {
    return (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) ? true : false;
}

(()=>{
    let cookieObj = getDefaultCookie();
    
    if (!cookieObj) {
        return;
    }

    for (let cookie in cookieObj) {
        if (cookieObj.hasOwnProperty(cookie)) {
            createTr(cookie, cookieObj[cookie])
        }
    }
    
})()