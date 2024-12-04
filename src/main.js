import {
  getBooksByTitle,
  getBooksByAuthor,
  getBooksByAnything,
} from "./libraryAPI.js";

const form = document.getElementById("form");
const inputText = document.getElementById("inputText");
const authorButton = document.getElementById("author");
const allButton = document.getElementById("all");
const titleButton = document.getElementById("title");

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
                </div>
            </div>
        `;
    rowCards.appendChild(cardItem);
  });
}

function markFieldAsNotValid(field, message) {
  field.classList.add("is-invalid");
  const feedback = field.nextElementSibling;
  if (feedback) {
    feedback.textContent = message;
  }
}

function markFieldAsValid(field) {
  field.classList.remove("is-invalid");
}
