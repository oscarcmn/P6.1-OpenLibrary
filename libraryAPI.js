const API_URL = "https://openlibrary.org/search.json?";

export async function getPosts() {
  try {
    const response = await fetch(API_URL + "/posts");
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
