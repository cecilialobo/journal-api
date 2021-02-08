const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const database = [
    {
        id: 0,
        title: "My First Post",
        category: "Lifestyle",
        author: "Cecilia",
        content: "Hello World! This is my first post! Coding is awesome."
    },
    {
        id: 1,
        title: "One more Post",
        category: "Games",
        author: "Cecilia",
        content: "This is one more post. In this one I'm gonna say that the best game ever is Cards Agains Humanity."
    },
    {
        id: 2,
        title: "Last Post",
        category: "Job",
        author: "Cecilia",
        content: "This is the last post. I need a job."
    }
]

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

app.delete('/posts/:idOfPost', (req, res) => {
    const { idOfPost } = req.params;
    let wasDeleted = false;

    for(let i = 0; i < database.length; i++) {
        if(database[i].id == idOfPost) {
            database.splice(i, 1);
            wasDeleted = true;
        }
    };
    res.status(wasDeleted ? 204 : 404).send();
});

app.put('/posts/:idOfPost', (req, res) => {
    const { idOfPost } = req.params;
    let wasEdited = false;
    const postEdited = {
        "title": "new title",
        "category": "new category",
        "author": "new author",
        "content": "new content"
    }

    for(let i = 0; i < database.length; i++) {
        if(database[i].id == idOfPost) {
            database[i].title = postEdited.title
            database[i].category =  postEdited.category
            database[i].author = postEdited.author
            database[i].content = postEdited.content
            wasEdited = true;
        }
    };

    res.status(wasEdited ? 200 : 404).send();
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});