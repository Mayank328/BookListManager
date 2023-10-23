//Book Class: Reperesent a Book
class book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class :Handles UI Tasks
class UI {
    static displayBooks() {
        const BOOKS = store.getBooks();
        // console.log(BOOKS)
        BOOKS.forEach((bks) => UI.addBookToList(bks));
    }
    static addBookToList(bks) {
        const List = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${bks.title}</td>
        <td>${bks.author}</td>
        <td>${bks.isbn}</td>
        <td><a href="#" class="btn btn-danger btn btn-sm delete">X</a></td>
        `;
        List.appendChild(row);
    }
    static clearfields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static deletebook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static showalert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //time after which alert disappears
        setTimeout(() => document.querySelector('.alert').remove(), 1500);
    }
}

//Store Class: Handles Storage
class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }
    static addBooks(book) {
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(isbn) {
        const books = store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event:Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log("YES");
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //Validate the field
    if (title == '' || author == '' || isbn == '') {
        UI.showalert("please fill the required field", 'danger');
    }
    else {

        //initialise a new book
        const bks = new book(title, author, isbn);
        console.log(bks);
        //Add to UI
        UI.addBookToList(bks);

        store.addBooks(bks);
        UI.clearfields();
        UI.showalert("Book Added", "info");
    }
});

//Event:Removes a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    console.log(e.target);
    UI.deletebook(e.target);
    UI.showalert("Book Removed", "success");
    store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
});