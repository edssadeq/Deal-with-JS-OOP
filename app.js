class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

class UI {
    addBookList(book) {
        const list = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message, class_name) {
        const div = document.createElement("div");
        //add class name
        div.className = `alert ${class_name}`;
        //add message
        div.appendChild(document.createTextNode(`${message}`));

        const container = document.querySelector(".container");

        container.insertBefore(div, document.querySelector("#book-form"));
        //remove the alert after 3 sec 
        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 3000);

    }

    deleteBook(target) {
        if (target.className == "delete") {
            target.parentElement.parentElement.remove(); // a -> td -> tr
        }
    }

    resetFeilds() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#ISBN').value = '';
    }
}

document.querySelector("#book-form").addEventListener('submit', function (e) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#ISBN').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title.length == 0 || author.length == 0 || isbn.length == 0) {
        ui.showAlert("Please fill in all feilds !", "error");
    }
    else {
        ui.addBookList(book);
        ui.showAlert("book added !", "success");
        ui.resetFeilds();
    }

    e.preventDefault();
});


document.querySelector("#book-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("book removed !", "success");

    e.preventDefault();

});