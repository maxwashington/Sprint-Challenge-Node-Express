const express = require("express");
const cors = require("cors");
const server = express();
const port = 5001;
projectDB = require("./data/helpers/projectModel");
actionsDB = require("./data/helpers/actionModel");

server.use(express.json());
server.use(cors());

server.get("/api/projects", (req, res) => {
  projectDB
    .get()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.get("/api/actions", (req, res) => {
  actionsDB
    .get()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.get("/api/projects/:id", (req, res) => {
  let { id } = req.params;
  if (id) {
    projectDB
      .get(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.status(400).json({ error: "Please include an ID" });
  }
});

server.get("/api/actions/:id", (req, res) => {
  let { id } = req.params;
  if (id) {
    actionsDB
      .get(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.status(400).json({ error: "Please include an ID" });
  }
});

server.post("/api/projects", (req, res) => {
  let { name, description } = req.body;
  console.log(name, description);
  if (name === undefined || description === undefined) {
    res
      .status(400)
      .json({
        error: "Please enter both a name and description for the project"
      });
  }
  projectDB
    .insert({ name, description })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "A database error occured, please try again later" });
    });
});

server.post("/api/actions", (req, res) => {
  let { notes, description } = req.body;
  actionsDB
    .insert({ notes: notes, description: description })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "A database error occured, please try again later" });
    });
});


server.delete("/api/projects/:id", (req, res) => {
  let { id } = req.params;
  console.log("fire", id);
  projectDB
    .get(id)
    .then(result => {
      projectDB
        .remove(id)
        .then(count => {
          res.json(result);
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: "A database error occured, please try again later"
            });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "A database error occured, please try again later" });
    });
});

server.delete("/api/actions/:id", (req, res) => {
  let { id } = req.params;
  console.log("fire", id);
  actionsDB
    .get(id)
    .then(result => {
      projectDB
        .remove(id)
        .then(count => {
          res.json(result);
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: "A database error occured, please try again later"
            });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "A database error occured, please try again later" });
    });
});

server.put("/api/projects/:id", (req, res) => {
  let { name, description, completed } = req.body;
  let { id } = req.params;
  completed === undefined ? (completed = false) : completed;
  projectDB
    .update(id, { name: name, description: description, completed: completed })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "A database error occured, please try again later" });
    });
});

server.put("/api/actions/:id", (req, res) => {
  let { notes, description, completed } = req.body;
  let { id } = req.params;
  completed === undefined ? (completed = false) : completed;
  actionsDB
    .update(id, {
      notes: notes,
      description: description,
      completed: completed
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "A database error occured, please try again later" });
    });
});

//ServerMessage

server.listen(port, () =>
  console.log(`*** Server Running on Port ${port} ***`)
);
