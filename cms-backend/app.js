const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const database = require("./database.js");

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    const responseBody = {
        "posts": database
    }

    res.send(responseBody);
});

app.post('/posts', (req, res) => {     
    const newPost = {
        id: database.length,
        ...req.body
    }
    
    database.push(newPost);

    res.status(201).send();
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    let wasDeleted = false;

    for(let i = 0; i < database.length; i++) {
        if(database[i].id == id) {
            database.splice(i, 1);
            wasDeleted = true;
        }
    };
    res.status(wasDeleted ? 204 : 404).send();
});

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    let wasEdited = false;
    console.log(req.body);
    const postEdited = {
        "title": req.body.title,
        "category": req.body.category,
        "author": req.body.author,
        "content": req.body.content
    }

    for(let i = 0; i < database.length; i++) {
        if(database[i].id == id) {
            database[i].title = postEdited.title
            database[i].category =  postEdited.category
            database[i].author = postEdited.author
            database[i].content = postEdited.content
            wasEdited = true;
        }
    };

    res.status(wasEdited ? 200 : 404).send();
});

app.get('/posts/:category', (req, res) => {
    const { category } = req.params;

    const postsInCategory = [];

    for(let i = 0; i < database.length; i++) {
        if(database[i].category == category) {
            postsInCategory.push(database[i])
        }
    };

    const responseBody = {
        "posts": postsInCategory
    };

    res.send(responseBody);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});