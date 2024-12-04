import { getBooksByTitle } from "./libraryAPI.js";

document.addEventListener("DOMContentLoaded", (ev) => {
  const form = document.getElementById("form");
  const query = document.getElementById("query");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

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

  getBooksByTitle()
    .then((books) => {
      console.log(books);
      renderBooks(books);
    })
    .catch((err) => {
      console.log("ERROR: " + err);
      return null;
    });
  /*
  getBooksByAuthor(query)
    .then((books) => {
      console.log(books);
      renderBooks(books);
    })
    .catch((err) => {
      console.log("ERROR: " + err);
      return null;
    });
*/
  /*
  getBooksByAnything(query)
    .then((books) => {
      console.log(books);
      renderBooks(books);
    })
    .catch((err) => {
      console.log("ERROR: " + err);
      return null;
    });
*/
  const rowCards = document.querySelector(".row");
  function renderBooks(books) {
    const card = document.querySelector("#cardpreview");
    books.docs.forEach((book) => {
      const cardItem = document.createElement("div");

      cardItem.classList.add("card-item");
      cardItem.innerHTML = `
        <div class="card mx-auto font" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="img-top" alt="Imagen de ejemplo">
                <div class="card-body ">
                    <div class="d-flex justify-content-between">
                        <h5 class="title">${book.title}</h5>
                        <div>
                            <p class="year">${book.publish_year}</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <p class="property">author</p>
                        <p class="dataproperty">${book.author_name}</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">avg rating</p>
                        <p class="dataproperty">${book.ratings_average}</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">number of ratings</p>
                        <p class="dataproperty">${book.ratings_count}</p>
                    </div>
                    <div class="d-flex">
                        <p class="property">number of pages</p>
                        <p class="dataproperty">${book.number_of_pages_median}</p>
                    </div>
                </div>
            </div>
        `;
      card.appendChild(cardItem);
    });
  }
  getBooksByTitle();
});
