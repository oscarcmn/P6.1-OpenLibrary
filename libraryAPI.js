const API_URL = "https://openlibrary.org";

export async function getPosts() {
  try {
    const response = await fetch(
      API_URL +
        "/search.json?title=the+way+of+kings&fields=title,author_name,publish_year,ratings_average,ratings_count,cover_i,number_of_pages_median&limit=1"
    );
    //parse the json response
    const data = await response.json();
    //do something with data
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function createNewPost(post) {
  try {
    const response = await fetch(
      `${API_URL}/search.json?title=the+way+of+kings&fields=title,author_name,publish_year,ratings_average,ratings_count,cover_i,number_of_pages_median&limit=1"`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const newPost = await response.json();
    return newPost;
  } catch (error) {
    console.error("Post Data Error:", error);
    throw error;
  }
}


