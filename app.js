document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addButton');

    addButton.addEventListener('click', function () {
        addBook();
    });

    function addBook() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        if (!title || !author || !isbn) {
            alert("Please fill in all fields");
            return;
        }

        const book = { title, author, isbn };
        const books = getBooksFromLocalStorage();
        books.push(book);
        saveBooksToLocalStorage(books);

        displayBooks();
        alert("Book added successfully!");
    }

    function deleteBook(index) {
        const books = getBooksFromLocalStorage();
        const deletedBook = books.splice(index, 1)[0];
        saveBooksToLocalStorage(books);

        displayBooks();
        alert(`Book "${deletedBook.title}" deleted successfully!`);
    }

    function displayBooks() {
        const books = getBooksFromLocalStorage();
        const tableBody = document.getElementById('bookTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = "";

        for (let i = 0; i < books.length; i++) {
            const row = tableBody.insertRow(i);
            const cellTitle = row.insertCell(0);
            const cellAuthor = row.insertCell(1);
            const cellISBN = row.insertCell(2);
            const cellAction = row.insertCell(3);

            cellTitle.innerHTML = books[i].title;
            cellAuthor.innerHTML = books[i].author;
            cellISBN.innerHTML = books[i].isbn;

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.addEventListener('click', function () {
                deleteBook(i);
            });

            cellAction.appendChild(deleteButton);
        }
    }

    function getBooksFromLocalStorage() {
        return JSON.parse(localStorage.getItem('books')) || [];
    }

    function saveBooksToLocalStorage(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Display existing books on page load
    displayBooks();
});
