// Global variables 
const inputField = document.getElementById('input-field');
const totalBook = document.getElementById('total-book')
const showError = document.getElementById('error')
const bookContainer = document.getElementById('books-container');

// Spinner function
const spinner = style => {
    document.getElementById('spinner').style.display = style;
}
// Getting input value on btn click
const searchInput = () => {
    // Display spiner
    spinner('block')
    // Clear DOM 
    bookContainer.textContent = '';
    totalBook.textContent = '';
    showError.innerText = '';

    if (inputField.value === '') {
        // Error handle
        showError.innerHTML = `
            <h3 class="text-danger text-center fw-bolder"> Please Write A Book Name..</h3>
            `;
        // Hide spinner
        spinner('none')
    }
    else {
        // API call
        const url = `https://openlibrary.org/search.json?q=${inputField.value}`
        fetch(url)
            .then(res => res.json())
            .then(data => showData(data))
    }
    // InputField clear
    inputField.value = '';
}

// Geting all data
const showData = (items) => {
    const books = items.docs;
    if (items.numFound === 0) {
        // Error handle
        showError.innerHTML = `
            <h3 class="text-warning text-center fw-bolder"> No Result Found..!!</h3>
            `;
    }
    else {
        // Total search item
        totalBook.innerHTML = `
            <h3 class="bg-secondary text-info text-center">${items.numFound} Books Found</h3>
            `;
        // Display every single book to DOM
        books.forEach(book => {
            console.log(book)
            const bookDiv = document.createElement('div')
            bookDiv.classList.add('col')
            bookDiv.innerHTML = `
            <div class="card h-100 shadow">
                <img  style="height: 350px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title fw-bolder">${book.title}</h4>
                <p class="mb-0 fw-bold">Written by
                    <span class="text-primary">
                        <a class="text-decoration-none fw-bolder" href="#">${book.author_name ? book.author_name[0] : 'Unknown Author'}</a>
                    </span>
                </p>
                <p class="mb-0 fw-bold">Published by
                    <span class="text-primary">
                        <a class="text-decoration-none fw-bolder" href="#">${book.publisher ? book.publisher[0] : 'Unknown Publisher'}</a>
                    </span>
                </p>
                <p class="mb-0 fw-bold">Catagory:
                    <span class="fw-bolder">
                    ${book.subject_facet ? book.subject_facet[0] : 'Unknown'}
                    </span>
                </p>
                <p class="mt-3 fw-bold">Published Year:
                    <span class="fw-bolder">
                    ${book.first_publish_year ? book.first_publish_year : 'Unknown'}
                    </span>
                </p>
            </div>
            </div>
            `;
            bookContainer.appendChild(bookDiv)
        });
    }
    // Hide spinner
    spinner('none')
}
