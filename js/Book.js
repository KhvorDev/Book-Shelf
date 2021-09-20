class Book {
    constructor(img, title, author, year,) {
        this.img = img;
        this.title = title;
        this.author = author;
        this.year = year;
    }
    createBook() {
        let item = document.createElement('div');
        let description = document.createElement('div');
        let coverBox = document.createElement('div');
        let cover = document.createElement('img');
        let infoBox = document.createElement('div');
        let bookTitle = document.createElement('h3');
        let bookAuthor = document.createElement('p');
        let bookYear = document.createElement('p');
        let controlBox = document.createElement('div');
        let buttonEdit = document.createElement('button');
        let buttonDelete = document.createElement('button');

        item.classList.add('shelf__body', 'shelf-item');
        description.classList.add('shelf-item__description');
        coverBox.classList.add('shelf-item__img');
        cover.classList.add('shelf-item__cover');
        infoBox.classList.add('item-info', 'shelf-item__info');
        bookTitle.classList.add('item-info__title');
        bookAuthor.classList.add('item-info__author');
        bookYear.classList.add('item-info__year');
        controlBox.classList.add('shelf-item__control');
        buttonEdit.classList.add('shelf-item__edit');
        buttonDelete.classList.add('shelf-item__delete');

        buttonEdit.setAttribute('data-path', 'edit');
        buttonEdit.setAttribute('data-numberItem', '0');
        buttonDelete.setAttribute('data-path', 'delete');
        buttonDelete.setAttribute('data-numberItem', '0');
        cover.setAttribute('src', this.img);

        bookTitle.textContent = this.title;
        bookAuthor.textContent = this.author;
        bookYear.textContent = `${this.year}г.`;
        buttonEdit.textContent = 'Редактировать';
        buttonDelete.textContent = 'Удалить';


        item.append(description, controlBox);
        description.append(coverBox, infoBox);
        controlBox.append(buttonEdit, buttonDelete);
        coverBox.append(cover);
        cover.setAttribute('src', this.img);
        infoBox.append(bookTitle, bookAuthor, bookYear);

        return item;
    }
}