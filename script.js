// Book Constructor
function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
    this.id = crypto.randomUUID()
    
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}, id: ${this.id}`;
    };
}

// Library array
const myLibrary = [];

// DOM Elements
const toggleFormBtn = document.getElementById('toggle-form-btn');
const formContainer = document.getElementById('form-container');
const bookForm = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');
const libraryContainer = document.getElementById('library-container');

// Function to add book to library
function addBookToLibrary(title, author, pages, read = false) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayLibraryOnPage();
    return newBook;
}

// Form handling functions
function toggleForm() {
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;
    
    // Add the new book to the library
    addBookToLibrary(title, author, pages, read);
    
    // Reset and hide the form
    bookForm.reset();
    toggleForm();
    
    // Show success message
    alert(`"${title}" has been added to your library!`);
}

// Display functions
function displayLibraryOnPage() {
    libraryContainer.innerHTML = '';
    
    if (myLibrary.length === 0) {
        libraryContainer.innerHTML = '<div class="empty-library">No books in your library yet. Add some books to get started!</div>';
        return;
    }
    
    myLibrary.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        libraryContainer.appendChild(bookCard);
    });
}

function createBookCard(book, index) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    // Helper function to create elements quickly
    const createElement = (tag, text, className = '') => {
        const el = document.createElement(tag);
        if (text) el.textContent = text;
        if (className) el.className = className;
        return el;
    };
    
    card.appendChild(createElement('h3', book.title));
    card.appendChild(createElement('p', `Author: ${book.author}`));
    card.appendChild(createElement('p', `Pages: ${book.pages}`));
    
    const status = createElement('p', `Status: `);
    const statusSpan = createElement('span', book.read ? '✓ Read' : '✗ Unread', `read-status ${book.read ? 'status-read' : 'status-unread'}`);
    status.appendChild(statusSpan);
    card.appendChild(status);
    
    const actions = createElement('div', '', 'book-card-actions');
    const toggleBtn = createElement('button', `Mark as ${book.read ? 'Unread' : 'Read'}`, 'toggle-read-btn');
    const removeBtn = createElement('button', 'Remove', 'remove-btn');
    
    toggleBtn.addEventListener('click', () => toggleReadStatus(index));
    removeBtn.addEventListener('click', () => removeBook(index));
    
    actions.appendChild(toggleBtn);
    actions.appendChild(removeBtn);
    card.appendChild(actions);
    
    return card;
}

function toggleReadStatus(index) {
    if (myLibrary[index]) {
        myLibrary[index].read = !myLibrary[index].read;
        displayLibraryOnPage();
    }
}

function removeBook(index) {
    if (myLibrary[index]) {
        const bookTitle = myLibrary[index].title;
        if (confirm(`Are you sure you want to remove "${bookTitle}" from your library?`)) {
            myLibrary.splice(index, 1);
            displayLibraryOnPage();
        }
    }
}

// Initialize with sample books
function initializeSampleBooks() {
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
    addBookToLibrary("1984", "George Orwell", 328, false);
    addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);
    addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, false);
}

// Event listeners
toggleFormBtn.addEventListener('click', toggleForm);
cancelBtn.addEventListener('click', toggleForm);
bookForm.addEventListener('submit', handleFormSubmit);

// Initialize the application
window.addEventListener('DOMContentLoaded', () => {
    initializeSampleBooks();
});