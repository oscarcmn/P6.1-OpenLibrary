import { getBooksByTitle } from "./libraryAPI.js";

document.addEventListener("DOMContentLoaded", (ev) => {
  const postSection = document.querySelector(".posts");


  // Obtener todos los radio buttons
const radios = document.querySelectorAll('input[type="radio"][name="opciones"]');

// Función para manejar el evento
function manejarRadio(event) {
  // Iterar sobre todos los radios y marcar su valor como false
  radios.forEach(radio => {
    // Si el radio está seleccionado, devuelve true, de lo contrario false
    radio.value = radio === event.target ? 'true' : 'false';
  });
}

// Agregar el event listener a cada radio button
radios.forEach(radio => {
  radio.addEventListener('change', manejarRadio);
});





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




