const openEditPage = (idOfPost, post) => {
    const formDiv = document.getElementById("form");
    formDiv.style.display = "block";

    const mainPosts = document.getElementById("mainPosts");
    mainPosts.style.display = "none";

    const inputForTitle = document.getElementById("editPostTitle");
    inputForTitle.setAttribute("value", `${post.title}`);

    const inputForAuthor = document.getElementById("editPostAuthor");
    inputForAuthor.setAttribute("value", `${post.author}`);

    const inputForContent = document.getElementById("editPostContent");
    inputForContent.innerHTML = `${post.content}`;

    const buttonToEditPost = document.getElementById("editPost");
    buttonToEditPost.addEventListener("click", () => {editPost(idOfPost)})
};

const editPost = (idOfPost) => {
    const apiPath = `http://localhost:3000/posts/${idOfPost}`;

    const titleEdited = document.getElementById("editPostTitle").value;
    const authorEdited = document.getElementById("editPostAuthor").value;
    const categoryEdited = document.getElementById("editPostCategory").value;
    const contentEdited = document.getElementById("editPostContent").value;

    const requestBody = {
        title: titleEdited,
        category: categoryEdited,
        author: authorEdited,
        content: contentEdited
    };

    fetch(apiPath, { method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(requestBody)})
        .then(response => {
            if (response.status === 200) {
                alert("The post was edited.");
                window.location.reload();
            }
        });
};
