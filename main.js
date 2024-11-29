import { getBooksByTitle } from "./libraryAPI.js";

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
  getBooksByTitle()
    .then((books) => {
      console.log(books);
      renderBooks(books);
    })
    .catch((err) => {
      console.log("ERROR: " + err);
      return null;
    });

  function renderBooks(books) {
    const card = document.querySelector("#cardpreview");
    books.docs.forEach((book) => {
      const cardItem = document.createElement("div");

      cardItem.classList.add("card-item");
      cardItem.innerHTML = `
        <div class="card mx-auto font" style="width: 18rem;">
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
      card.appendChild(cardItem);
    });
  }
});
