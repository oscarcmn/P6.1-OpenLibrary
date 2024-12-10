import {
  getBooksByTitle,
  getBooksByAuthor,
  getBooksByAnything,
  createNewFav,
  getBooksFromPrivateAPI,
  deleteBookFromFavorites,
} from "./libraryAPI.js";

const form = document.getElementById("form");
const inputText = document.getElementById("inputText");
const authorButton = document.getElementById("author");
const allButton = document.getElementById("all");
const titleButton = document.getElementById("title");
const privateApiButton = document.getElementById("privateApiButton");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (validateForm()) {
    const query = inputText.value.trim();

    if (titleButton.checked) {
      getBooksByTitle(query)
        .then((books) => {
          console.log(books);
          renderBooks(books);
        })
        .catch((err) => {
          console.log("ERROR: " + err);
        });
    } else if (authorButton.checked) {
      getBooksByAuthor(query)
        .then((books) => {
          console.log(books);
          renderBooks(books);
        })
        .catch((err) => {
          console.log("ERROR: " + err);
        });
    } else if (allButton.checked) {
      getBooksByAnything(query)
        .then((books) => {
          console.log(books);
          renderBooks(books);
        })
        .catch((err) => {
          console.log("ERROR: " + err);
        });
    } else {
      console.log("No radio button selected.");
    }
  } else {
    console.log("There is some not-valid field. The user should check them.");
  }
});

function validateForm() {
  let isValid = true;

  if (inputText.value.trim() === "") {
    markFieldAsNotValid(inputText, "Enter a query!");
    isValid = false;
  } else {
    markFieldAsValid(inputText);
  }

  return isValid;
}

const rowCards = document.querySelector(".row");
function renderBooks(books) {
  rowCards.innerHTML = "";
  books.docs.forEach((book) => {
    const cardItem = document.createElement("div");

    cardItem.classList.add("col");
    cardItem.innerHTML = `
        <div class="card mx-auto font" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${
                  book.cover_i || ""
                }.jpg" class="img-top" alt="Book cover">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="title">${book.title || "Unknown Title"}</h5>
                        <div>
                            <p class="year">${
                              book.publish_year ? book.publish_year[0] : "N/A"
                            }</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <p class="property">Author</p>
                        <p class="dataproperty">${
                          book.author_name
                            ? book.author_name.join(", ")
                            : "Unknown"
                        }</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">Avg Rating</p>
                        <p class="dataproperty">${
                          book.ratings_average || "N/A"
                        }</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">Number of Ratings</p>
                        <p class="dataproperty">${
                          book.ratings_count || "N/A"
                        }</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">Number of Pages</p>
                        <p class="dataproperty">${
                          book.number_of_pages_median || "N/A"
                        }</p>
                    </div>
                     <button data-id="${
                       book.key
                     }" class="btn btn-primary btn-sm fav-btn">Fav</button>
                </div>
            </div>
        `;
    rowCards.appendChild(cardItem);

    const favButton = cardItem.querySelector(".fav-btn");
    favButton.addEventListener("click", () => {
      const newFav = {
        title: book.title || "Unknown Title",
        cover_i: book.cover_i || "",
        publish_year: book.publish_year,
        author_name: book.author_name ? book.author_name.join(", ") : "Unknown",
        ratings_average: book.ratings_average || "N/A",
        ratings_count: book.ratings_count || "N/A",
        number_of_pages_median: book.number_of_pages_median || "N/A",
      };

      createNewFav(newFav)
        .then(() => {
          console.log("Book added to favorites:", newFav);
        })
        .catch((err) => {
          console.error("Error adding book to favorites:", err);
        });
    });
  });
}

privateApiButton.addEventListener("click", function () {
  getBooksFromPrivateAPI()
    .then((books) => {
      console.log(books);
      renderFavs(books);
    })
    .catch((err) => {
      console.log("ERROR: " + err);
    });
});

function renderFavs(books) {
  rowCards.innerHTML = "";
  books.forEach((book) => {
    const cardItem = document.createElement("div");

    cardItem.classList.add("col");
    cardItem.innerHTML = `
        <div class="card mx-auto font" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${
                  book.cover_i || ""
                }.jpg" class="img-top" alt="Book cover">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="title">${book.title || "Unknown Title"}</h5>
                        <div>
                            <p class="year">${
                              book.publish_year ? book.publish_year[0] : "N/A"
                            }</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <p class="property">Author</p>
                        <p class="dataproperty">${
                          book.author_name ? book.author_name : "Unknown"
                        }</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">Avg Rating</p>
                        <p class="dataproperty">${
                          book.ratings_average || "N/A"
                        }</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">Number of Ratings</p>
                        <p class="dataproperty">${
                          book.ratings_count || "N/A"
                        }</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">Number of Pages</p>
                        <p class="dataproperty">${
                          book.number_of_pages_median || "N/A"
                        }</p>
                    </div>
                     <button data-id="${
                       book.id
                     }" class="btn btn-danger btn-sm del-btn">Delete</button>
                </div>
            </div>
        `;
    rowCards.appendChild(cardItem);
    const deleteButton = cardItem.querySelector(".del-btn");
    deleteButton.addEventListener("click", () => {
      const bookId = deleteButton.dataset.id;
      deleteBookFromFavorites(bookId)
        .then(() => {
          console.log(
            `Book with ID ${bookId} has been deleted from favorites.`
          );
        })
        .catch((err) => {
          console.error(`Error deleting book with ID ${bookId}:`, err);
        });
    });
  });
}
function markFieldAsNotValid(
  element,
  message = "Invalid field. Insert a valid value."
) {
  const errorElement = element.parentNode.querySelector(".error-message");
  if (errorElement) {
    errorElement.textContent = message;
  }
  element.parentNode.classList.add("is-not-valid-field");
}

function markFieldAsValid(element) {
  const errorElement = element.parentNode.querySelector(".error-message");
  if (errorElement) {
    errorElement.textContent = "";
  }
  element.parentNode.classList.remove("is-not-valid-field");
}
