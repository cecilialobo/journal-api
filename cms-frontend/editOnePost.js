module.exports.editOnePost = (idOfPost) => {
    const apiPath = `http://localhost:3000/posts/${idOfPost}`;

    fetch(apiPath, { method: "PUT" })
        .then(response => {
            if (response.status === 200) {
                alert("The post was edited.");
                window.location.reload();
            }
        });
};

//fazer o modulo funcionar