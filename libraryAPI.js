const API_URL = "https://openlibrary.org";

export async function getBooksByTitle(title) {
  const formatTitle = title.replace(/ /g, "+");
  try {
    const response = await fetch(
      `${API_URL}/search.json?title=${formatTitle}&fields=title,author_name,publish_year,ratings_average,ratings_count,cover_i,number_of_pages_median&limit=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

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

export async function createNewBook(book) {
  try {
    const response = await fetch(
      `${API_URL}/search.json?title=the+way+of+kings&fields=title,author_name,publish_year,ratings_average,ratings_count,cover_i,number_of_pages_median&language=eng"`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }
    );
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
