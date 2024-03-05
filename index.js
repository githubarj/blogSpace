const blogContainer = document.getElementById("blog-list");
const myForm = document.getElementById("post-form");

let content;

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    content = data.slice(0, 5);
    blogContainer.innerHTML = content
      .map((item) => `<h3>${item.title}  </h3>  <p> ${item.body} </p> <hr> `)
      .join(" ");
  })
  .catch((error) => console.error(error));

/**
 Challenge:
 
 * Listen for the "submit" event on the form (which will happen when the button is clicked)
    * (Don't forget to preventDefault on the form so it doesn't refresh your page. Google "form preventDefault" if you're not sure what I'm talking about)
 * Combine the title value and body value into an object (with a "title" property and "body" property)
 * Log the object to the console

*/

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(myForm);
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify({
      title: formData.get("post-title"),
      body: formData.get("post-body"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) =>  {
        let newblog = `<h3> ${data.title} </h3> <p> ${data.body} </p> <hr>`
        blogContainer.innerHTML += newblog 
    } );
});
