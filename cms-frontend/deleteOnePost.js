const deleteOnePost = (idOfPost) => {
    const apiPath = `http://localhost:3000/posts/${idOfPost}`;

    fetch(apiPath, { method: 'DELETE' })
        .then(response => {
            if (response.status === 204) {
                alert("The post was deleted.");
                window.location.reload();
            }
        });
};
