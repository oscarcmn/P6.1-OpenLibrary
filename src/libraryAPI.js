const API_URL = "https://openlibrary.org";
const private_API = "http://localhost:3000";

export async function getBooksByTitle(title) {
  const formattedTitle = title.replace(/ /g, "+");
  try {
    const response = await fetch(
      `${API_URL}/search.json?title=${formattedTitle}&fields=title,author_name,publish_year,ratings_average,ratings_count,cover_i,number_of_pages_median&language=eng`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getBooksByAnything(query) {
  const formattedquery = query.replace(/ /g, "+");
  try {
    const response = await fetch(
      `${API_URL}/search.json?title=${formattedquery}&fields=title,author_name,publish_year,ratings_average,ratings_count,cover_i,number_of_pages_median&language=eng`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export async function getBooksByAuthor(author) {
  const formattedAuthor = author.replace(/ /g, "+");
  try {
    const response = await fetch(
      `${API_URL}/search.json?author=${formattedAuthor}&fields=title,author_name,publish_year,ratings_average,ratings_count,cover_i,number_of_pages_median&language=eng`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function createNewFav(book) {
  try {
    const response = await fetch(`${private_API}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const newBook = await response.json();
    return newBook;
  } catch (error) {
    console.error("Post Data Error:", error);
    throw error;
  }
}

export async function getBooksFromPrivateAPI() {
  try {
    const response = await fetch(`${private_API}/books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
