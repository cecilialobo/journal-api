// const deleteOnePost = require("./deleteOnePost.js");
// const editOnePost = require("./editOnePost.js");

//consertar esses modulos

const getAllPosts = () => {
    const apiPath = "http://localhost:3000/posts";

    fetch(apiPath)
        .then(response => {
            return response.json()
        })
        .then(responseBody => {
            const posts = responseBody.posts;

            for (let i = 0; i < posts.length; i++) {
                const post = {
                    id: posts[i].id,
                    title: posts[i].title,
                    category: posts[i].category,
                    author: posts[i].author,
                    content: posts[i].content,
                }

                createPostDiv(post);
            }
        });
};

const editOnePost = (idOfPost) => {
    const apiPath = `http://localhost:3000/posts/${idOfPost}`;

    fetch(apiPath, { method: "PUT" })
        .then(response => {
            if (response.status === 200) {
                alert("The post was edited.");
                window.location.reload();
            }
        });
};

deleteOnePost = (idOfPost) => {
    const apiPath = `http://localhost:3000/posts/${idOfPost}`;

    fetch(apiPath, { method: 'DELETE' })
        .then(response => {
            if (response.status === 204) {
                alert("The post was deleted.");
                window.location.reload();
            }
        });
};

const createPostDiv = (post) => {
    const idOfPost = post.id;

    const newPostDiv = document.createElement("div");

    const createPostTitle = document.createElement("h2");
    createPostTitle.classList.add("title");
    createPostTitle.innerHTML = post.title;
    newPostDiv.appendChild(createPostTitle);

    const createPostCategory = document.createElement("h3");
    createPostCategory.classList.add("category");
    createPostCategory.innerHTML = post.category;
    newPostDiv.appendChild(createPostCategory);

    const createPostAuthor = document.createElement("p");
    createPostAuthor.classList.add("author");
    createPostAuthor.innerHTML = post.author;
    newPostDiv.appendChild(createPostAuthor);

    const createPostContent = document.createElement("p");
    createPostContent.classList.add("content");
    createPostContent.innerHTML = post.content;
    newPostDiv.appendChild(createPostContent);

    const createButtonToDelete = document.createElement("button");
    createButtonToDelete.classList.add(`deletePost${idOfPost}`);
    createButtonToDelete.innerHTML = "Delete this post";
    createButtonToDelete.addEventListener("click", () => {deleteOnePost(idOfPost)});
    newPostDiv.appendChild(createButtonToDelete);
    
    const createButtonToEdit = document.createElement("button");
    createButtonToEdit.classList.add(`editPost${idOfPost}`);
    createButtonToEdit.innerHTML = "Edit this post";
    createButtonToEdit.addEventListener("click", () => {editOnePost(idOfPost)});
    newPostDiv.appendChild(createButtonToEdit);

    const createLine = document.createElement("hr");
    newPostDiv.appendChild(createLine);
    
    const postsDiv = document.getElementById("posts");
    postsDiv.appendChild(newPostDiv);
};

getAllPosts();