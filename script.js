const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  const libraryDiv = document.querySelector('.library');
  libraryDiv.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.dataset.index = index;

    const title = document.createElement('h2');
    title.textContent = book.title;
    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;
    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;
    const readBtn = document.createElement('button');
    readBtn.textContent = book.read ? 'Read' : 'Not Read';
    readBtn.addEventListener('click', () => toggleReadStatus(index));
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeBook(index));

    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(readBtn);
    bookDiv.appendChild(removeBtn);
    libraryDiv.appendChild(bookDiv);
  });
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  const dialog = document.getElementById('new-book-form');
  dialog.showModal();
});

document.getElementById('book-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  const dialog = document.getElementById('new-book-form');
  dialog.close();

  // Clear form fields for next input
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;
});

// Initialize with some example books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

// Display initial books
displayBooks();
