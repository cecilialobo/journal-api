const createNewPost = () => {
    const apiPath = "http://localhost:3000/posts";

    const titleOfPost = document.getElementById("inputPostTitle").value;
    const categoryOfPost = document.getElementById("inputPostCategory").value;
    const authorOfPost = document.getElementById("inputPostAuthor").value;
    const contentOfPost = document.getElementById("inputPostContent").value;

    const requestBody = {
        title: titleOfPost,
        category: categoryOfPost,
        author: authorOfPost,
        content: contentOfPost
    };

    fetch(apiPath, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(requestBody)})
        .then (response => {
            if(response.status === 201) {
                alert("Thanks for the post!");
                window.location.assign("index.html");
            }
        });
};

const sendNewsButton = document.getElementById("sendNews");
sendNewsButton.addEventListener("click", createNewPost);