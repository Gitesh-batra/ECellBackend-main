const express = require("express");
const Router = express.Router;

const { db } = require("../db");

const blogRouter = Router();

blogRouter.get("/", (req, res) => {
  db.all(
    `SELECT * FROM blogs WHERE user_id = ?`,
    [req.session.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(rows);
    }
  );
});

blogRouter.get("/:id", (req, res) => {
  db.get(`SELECT * FROM blogs WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    let blog = row;

    if (!blog) {
      return res.sendStatus(404);
    }

    if (blog.user_id !== req.session.id) {
      return res.sendStatus(401);
    }

    res.send(blog);
  });
});

blogRouter.post("/", (req, res) => {
  // insert a blog
  db.run(
    "INSERT INTO blogs (title, completed, user_id) VALUES (?, ?, ?)",
    [req.body.title, req.body.completed, req.session.id],
    function (err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
    }
  );

  res.sendStatus(200);
});

blogRouter.put("/:id", async (req, res) => {
  db.get(`SELECT * FROM blogs WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    let blog = row;

    if (blog.user_id !== req.session.id) {
      return res.sendStatus(401);
    }

    let completed = req.body.completed ?? blog.completed;
    let title = req.body.title ?? blog.title;

    // update a blog
    db.run(
      "UPDATE blogs SET title = ?, completed = ? WHERE id = ?",
      [title, completed, req.params.id],
      function (err) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
      }
    );

    res.sendStatus(200);
  });
});

blogRouter.delete("/:id", (req, res) => {
  // delete a blog
  db.run("DELETE FROM blogs WHERE id = ?", [req.params.id], function (err) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });

  res.sendStatus(200);
});

module.exports = blogRouter;
