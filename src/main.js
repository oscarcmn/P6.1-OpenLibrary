import { getAllPosts, createNewPost } from "./socialApi.js";

document.addEventListener("DOMContentLoaded", (ev) => {
  const postSection = document.querySelector(".posts");

  getAllPosts()
    .then((books) => {
      console.log(books);
      renderBooks(books);
    })
    .catch((err) => {
      console.log("ERROR: " + err);
      return null;
    });

  //event listener, when submit form, call createNewPost
  function renderBooks(posts) {
    const postSection = document.querySelector(".books");
    const cardtemplate = document.querySelector(".template");

    posts.forEach((post) => {
      const card = cardtemplate.cloneNode(true).content;

      const cardTitle = card.querySelector("#title");
      cardTitle.textContent = post.title;

      const cardAuthor = card.querySelector("#author");
      cardAuthor.textContent = post.author;

      postSection.append(card);
    });

    const form = document.querySelector("form");
    const buttonForm = form.querySelector("form button");

    buttonForm.addEventListener("click", (event) => {
      const newPost = {
        title: form.querySelector("#title").value,
        author: form.querySelector("#author").value,
      };

      createNewPost(newPost);
      document.dispatchEvent("DOMContentLoaded");
    });
  }
});
