const getTextBtn = document.getElementById("getText");
const output = document.getElementById("output");
const getUsersBtn = document.getElementById("getUsers");
const getPostsBtn = document.getElementById("getPosts");
const addPostForm = document.getElementById("addPost");
const inputTitle = document.getElementById("title");
const inputBody = document.getElementById("body");

getTextBtn.addEventListener("click", getText);
getUsersBtn.addEventListener("click", getUsers);
getPostsBtn.addEventListener("click", getPostsfromAPI);
addPostForm.addEventListener("submit", addPost);

function getText() {
  // console.log("get text button clicked");
  fetch("gitCommands.txt")
    .then(res => {
      // console.log(res.text());
      return res.text();
    })
    .then(data => {
      // console.log(data);
      output.innerHTML = `
      <h1 class='mb-4'>Text File</h1>
      <div class='mb-3'>${data}</div>
      `;
    })
    .catch(err => console.log(err));
}

function getUsers() {
  // console.log("get users button clicked");
  fetch("users.json")
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // output.innerHTML = data;
      outputHTML = "<h1 class='mb-4'>Users</h1>";
      data.forEach(user => {
        outputHTML += `<ul class="list-group mb-3">
        <li class="list-group-item">Name: ${user.name}</li>
        <li class="list-group-item">Email: ${user.email}</li>
        </ul>`;
      });
      output.innerHTML = outputHTML;
    })
    .catch(err => console.log(err));
}

function getPostsfromAPI() {
  console.log("Get Posts from API Button Clicked");
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
      outputHTML = "<h1 class='mb-4'>Posts</h1>";
      data.forEach(post => {
        outputHTML += `<div class="card card-body mb-3">
        <h3>ID: ${post.id}</h3>
        <h3>Title: ${post.title}</h3>
        <p><strong class="">Body:</strong> ${post.body}</p>
        </div>`;
      });
      output.innerHTML = outputHTML;
    });
}

function addPost(e) {
  console.log("Add Post button Clicked");
  e.preventDefault();
  let title = inputTitle.value;
  let body = inputBody.value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      body: body
    })
  })
    .then(res => res.json())
    .then(data => console.log(data));
}
