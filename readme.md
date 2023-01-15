# ECell Task 2
> Created a simple backend which can be used to create blogs, update blogs,
 delete blogs and get all blogs.
> The backend is created using Node.js, Express.js and SQLite3.

# How to run the project
1. Clone the repository
2. Use `npm install` to install all the dependencies
3. Use `npm start` to start the server

# API Endpoints
1. GET /blogs - Get all blogs
2. GET /blogs/:id - Get a blog by id
3. POST /blogs - Create a blog
4. PUT /blogs/:id - Update a blog
5. DELETE /blogs/:id - Delete a blog

# Tips
> Since this is a cookie based authentication, you can use the console of your browser directly to send fetch requests to the server after logging in.
>
> Fetch requests can be sent using the following code:
```js
// POST /blogs
fetch("http://localhost:3001/blogs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "test",
    completed: 0,
  }),
});

// PUT /blogs/:id
fetch("http://localhost:3001/blogs/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    completed: 1,
  }),
});

// DELETE /blogs/:id
fetch("http://localhost:3001/blogs/1", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
});

```


