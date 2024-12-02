import {
  getBooksByTitle,
  getBooksByAuthor,
  getBooksByAnything,
} from "./libraryAPI.js";

function getMinimumYear(years) {
  let min = years[0];
  for (let i = 1; i < years.length; i++) {
    if (years[i] < min) {
      min = years[i];
    }
  }
  return min;
}

document.addEventListener("DOMContentLoaded", (ev) => {
  const form = document.getElementById("form");
  const query = document.getElementById("query");
  const authorButton = document.getElementById("author");
  const titleButton = document.getElementById("title");
  const allButton = document.getElementById("all").value;

  console.log("entra al dom");
  form.addEventListener("submit", function (event) {
    console.log("entra al submit");
    event.preventDefault();
    event.stopPropagation();
    console.log(allButton.value);
    if (allButton.value === "all") {
      getBooksByAnything(query)
        .then((books) => {
          console.log(books);
          renderBooks(books);
        })
        .catch((err) => {
          console.log("ERROR: " + err);
          return null;
        });
    } else if (authorButton.value === "on") {
      getBooksByAuthor(query)
        .then((books) => {
          console.log(books);
          renderBooks(books);
        })
        .catch((err) => {
          console.log("ERROR: " + err);
          return null;
        });
    } else {
      getBooksByTitle(query)
        .then((books) => {
          console.log(books);
          renderBooks(books);
        })
        .catch((err) => {
          console.log("ERROR: " + err);
          return null;
        });
    }

    if (validateForm()) {
      console.log("All fields are ok, we can proceed");
      form.submit();
    } else {
      console.log("There is some not-valid field. The user should ckeck them.");
    }
  });

  function validateForm() {
    var isValid = true;

    if (query.value === "") {
      markFieldAsNotValid(query, "Enter a name!");
      isValid = false;
    } else {
      markFieldAsValid(query);
    }
    return isValid;
  }

  const rowCards = document.querySelector(".row");

  function renderBooks(books) {
    rowCards.innerHTML = "";
    books.docs.forEach((book) => {
      const newCard = document.createElement("div");
      newCard.className = "col-sm-6 col-md-4 col-xl-3 d-flex mt-3";
      newCard.innerHTML = `
        <div class="card mx-auto font">
                <img src="https://covers.openlibrary.org/b/id/${
                  book.cover_i
                }.jpg" class="img-top" alt="Imagen de ejemplo">
                <div class="card-body ">
                    <div class="d-flex justify-content-between">
                        <h5 class="title">${book.title}</h5>
                        <div>
                            <p class="year">${getMinimumYear(
                              book.publish_year
                            )}</p>
                        </div>
                    </div>
                    <div>
                        <p class="property">author</p>
                        <p class="dataproperty">${book.author_name}</p>
                    </div>
                    <div>
                        <p class="property">avg rating</p>
                        <p class="dataproperty">${book.ratings_average}</p>
                    </div>
                    <div>
                        <p class="property">number of ratings</p>
                        <p class="dataproperty">${book.ratings_count}</p>
                    </div>
                    <div>
                        <p class="property">number of pages</p>
                        <p class="dataproperty">${
                          book.number_of_pages_median
                        }</p>
                    </div>
                </div>
            </div>
        `;
      rowCards.appendChild(newCard);
    });
  }
});
