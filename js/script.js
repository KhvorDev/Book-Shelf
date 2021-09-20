let shelfItems = document.querySelectorAll('.shelf__body');
const buttonAdd = document.querySelector('.shelf__button');
const popupAdd = document.querySelector('.popup-add');
const popupDelete = document.querySelector('.popup-delete');
const popupDeleteButton = document.querySelector('.delete-book');
const buttonAddBook = document.querySelector('.popup-add-apply');
const popupOverlay = document.querySelectorAll('.popup-overlay');
const popupInput = document.querySelectorAll('.popup__input');


// Показывает форму добваления книги
function showPopupAdd() {
    let pathPopup = this.getAttribute('data-path');
    let popupAdd = document.querySelector(`[data-target="${pathPopup}"]`);

    popupAdd.classList.add('show');
    let inputYear = popupAdd.querySelector('.add-year');

    inputYear.onkeydown = function (e) {
        if ((e.which >= 48 && e.which <= 57)
            || (e.which >= 96 && e.which <= 105)
            || e.which == 8
            || (e.which >= 37 && e.which <= 40)
            || e.which == 46) {
            return true;
        } else {
            return false;
        }
    }

}
// Показывает окно удаления книги
function showPopupDelede() {
    let pathBook = this.getAttribute('data-numberItem');
    popupDeleteButton.setAttribute('data-numberItem', `${pathBook}`);

    popupDeleteButton.addEventListener('click', deleteBook);
    popupDelete.classList.add('show');

}
// Показываетс окно редактироания книги
function showPopupEdit() {
    let pathPopup = this.getAttribute('data-path');
    let pathBook = this.getAttribute('data-numberItem');
    let editBook = document.querySelector(`[data-numberItem="${pathBook}"]`);
    let editPopup = document.querySelector(`[data-target="${pathPopup}"]`);

    let popupTitle = editPopup.querySelector('.popup__book-title');
    let popupAuthor = editPopup.querySelector('.popup__author');
    let popupYear = editPopup.querySelector('.popup__year');
    let popupCover = editPopup.querySelector('.popup__cover');
    let popupURLCover = editPopup.querySelector('.popup__preview-img');
    let popupSaveButton = editPopup.querySelector('.popup-edit-apply');


    let bookTitle = editBook.querySelector('.item-info__title');
    let bookAuthor = editBook.querySelector('.item-info__author');
    let bookYear = editBook.querySelector('.item-info__year');
    let bookCover = editBook.querySelector('.shelf-item__cover');
    let bookCoverURL = editBook.querySelector('.shelf-item__cover').getAttribute('src');

    popupYear.onkeydown = function (e) {
        if ((e.which >= 48 && e.which <= 57)
            || (e.which >= 96 && e.which <= 105)
            || e.which == 8
            || (e.which >= 37 && e.which <= 40)
            || e.which == 46) {
            return true;
        } else {
            return false;
        }
    }

    popupTitle.value = bookTitle.innerHTML;
    popupAuthor.value = bookAuthor.innerHTML;
    popupYear.value = bookYear.innerHTML;
    popupCover.value = bookCoverURL;
    popupURLCover.setAttribute('src', bookCoverURL);
    popupSaveButton.setAttribute('data-numberItem', `${pathBook}`);

    editPopup.classList.add('show');

    popupSaveButton.onclick = dataEditChecking;
}

// закрывает все попапы
function closePopup(e) {
    if (e.target.classList.contains('close-popup')) {
        popupInput.forEach((el) => {
            el.value = '';
            el.classList.remove('data-error');
        })
        this.classList.remove('show');
    }
}

// Проверяет правильность измененных данных
function dataEditChecking() {
    let editPopup = document.querySelector('.popup-edit');
    let bookPath = this.getAttribute('data-numberItem');
    let editPopupTitle = editPopup.querySelector('.popup__book-title');
    let editPopupAouthor = editPopup.querySelector('.popup__author');
    let editPopupYear = editPopup.querySelector('.popup__year');
    let editPopupCover = editPopup.querySelector('.popup__cover');

    if (editPopupTitle.value == 0) {
        editPopupTitle.classList.add('data-error');
        editPopupTitle.setAttribute('placeholder', 'Вы забыли ввести название книги');
    }
    else if (editPopupAouthor.value == 0) {
        editPopupAouthor.classList.add('data-error');
        editPopupAouthor.setAttribute('placeholder', 'Вы забыли ввести имя автора');
    }
    else if (editPopupYear.value == 0) {
        editPopupYear.classList.add('data-error');
        editPopupYear.setAttribute('placeholder', 'Вы забыли указать год издания');
    }
    else if (Number(editPopupYear.value) > 2017) {
        editPopupYear.value = '';
        editPopupYear.classList.add('data-error');
        editPopupYear.setAttribute('placeholder', 'не больше 2017г.');

    }
    else if (editPopupCover.value == 0) {
        editPopupCover.classList.add('data-error');
        editPopupCover.setAttribute('placeholder', 'Вы забыли указать URL обложки');
    }
    else {
        applyChange(editPopupCover.value, editPopupTitle.value, editPopupAouthor.value, editPopupYear.value, bookPath);
    }

}

// Вносит измениния в карточку книги
function applyChange(cover, title, author, year, bookPath) {
    let editbook = document.querySelector(`[data-numberItem="${bookPath}"]`);
    let editPopup = document.querySelector('.popup-edit');
    let editBookTitle = editbook.querySelector('.item-info__title');
    let editBookAuthor = editbook.querySelector('.item-info__author');
    let editBookYear = editbook.querySelector('.item-info__year');
    let editBookCover = editbook.querySelector('.shelf-item__cover');

    editBookTitle.textContent = title;
    editBookAuthor.textContent = author;
    editBookYear.textContent = `${year}г.`;
    editBookCover.setAttribute('src', cover);

    editPopup.classList.remove('show');
}


//  Добавляет себытие редактирования на все кнопки "Редактировать"
function giveEventEdit() {
    let editButtons = document.querySelectorAll('[data-path="edit"]');
    editButtons.forEach((el) => {
        el.addEventListener('click', showPopupEdit);
    })

}
giveEventEdit();


// Добавляется событие удалить на все кнопки "Удалить"
function giveEventDelete() {
    let deleteButtons = document.querySelectorAll('[data-path="delete"]');
    deleteButtons.forEach((el) => {
        el.addEventListener('click', showPopupDelede)
    })

}
giveEventDelete();


// Добавляет карточку книги
function addBook(bookCover, bookTitle, bookAuthor, bookYear) {
    let newBook = new Book(bookCover, bookTitle, bookAuthor, bookYear);
    document.querySelector('.shelf').append(newBook.createBook());

    shelfItems = document.querySelectorAll('.shelf__body');
    for (let i = 0; i < shelfItems.length; i++) {
        let popupButton = shelfItems[i].querySelectorAll('[data-numberItem]');
        popupButton.forEach((item) => {
            item.setAttribute('data-numberItem', i);
        })
        shelfItems[i].setAttribute('data-numberItem', i);

    };
    popupAdd.classList.remove('show');
    popupInput.forEach((el) => {
        el.value = '';
        el.classList.remove('data-error');
    })
    giveEventEdit();
    giveEventDelete();
}


// Удаляет карточку книги
function deleteBook() {
    let deletePath = this.getAttribute('data-numberItem');
    document.querySelector(`[data-numberItem="${deletePath}"]`).remove();

    popupDelete.classList.remove('show');
}

//  Проверяет правильность введенных данных
function dataAddChecking() {
    let bookTitle = document.querySelector('.add-title');
    let bookAuthor = document.querySelector('.add-author');
    let bookYear = document.querySelector('.add-year');
    let bookCover = document.querySelector('.add-cover');


    if (bookTitle.value == 0) {
        bookTitle.classList.add('data-error');
        bookTitle.setAttribute('placeholder', 'Вы забыли ввести название книги');
    }
    else if (bookAuthor.value == 0) {
        bookAuthor.classList.add('data-error');
        bookAuthor.setAttribute('placeholder', 'Вы забыли ввести имя автора');
    }
    else if (bookYear.value == 0) {
        bookYear.classList.add('data-error');
        bookYear.setAttribute('placeholder', 'Вы забыли указать год издания');
    }
    else if (Number(bookYear.value) > 2017) {
        bookYear.value = '';
        bookYear.classList.add('data-error');
        bookYear.setAttribute('placeholder', 'не больше 2017г.');

    }
    else if (bookCover.value == 0) {
        bookCover.classList.add('data-error');
        bookCover.setAttribute('placeholder', 'Вы забыли указать URL обложки');
    }
    else {
        addBook(bookCover.value, bookTitle.value, bookAuthor.value, bookYear.value);
    }

}

// Добавляет событие закрыть на свободное пространство страницы
popupOverlay.forEach((el) => {
    el.addEventListener('click', closePopup)
});

buttonAdd.addEventListener('click', showPopupAdd);

buttonAddBook.addEventListener('click', dataAddChecking);





