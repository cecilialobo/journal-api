const lifestyleLink = document.getElementById("linkLifestyle");
const categoryLifestyle = lifestyleLink.innerHTML;

const gamesLink = document.getElementById("linkGames");
const categoryGames = gamesLink.innerHTML;

const jobLink = document.getElementById("linkJob");
const categoryJob = jobLink.innerHTML;

lifestyleLink.addEventListener("click", () => {getPostsByCategory(categoryLifestyle)});
gamesLink.addEventListener("click", () => {getPostsByCategory(categoryGames)});
jobLink.addEventListener("click", () => {getPostsByCategory(categoryJob)});

const getPostsByCategory = (category) => {
    const apiPath = `http://localhost:3000/posts/${category}`;
    
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

                createCategoryDiv(post, category);
            }

            const categoryTitle = document.getElementById("categoryTitle")
            categoryTitle.innerHTML = `Category: ${category}`;
        });
}

const createCategoryDiv = (post, category) => {
    const mainPosts = document.getElementById("mainPosts");
    mainPosts.style.display = "none";

    const categoryDiv = document.getElementById("category");
    categoryDiv.style.display = "block";

    const postsForCategory = document.getElementById("postsForCategory");

    const postTitle = document.createElement("h2");
    postTitle.classList.add("title");
    postTitle.innerHTML = post.title;
    postsForCategory.appendChild(postTitle);

    const postCategory = document.createElement("h3");
    postCategory.classList.add("category");
    postCategory.innerHTML = post.category;
    postsForCategory.appendChild(postCategory);

    const postAuthor = document.createElement("p");
    postAuthor.classList.add("author");
    postAuthor.innerHTML = post.author;
    postsForCategory.appendChild(postAuthor);

    const postContent = document.createElement("p");
    postContent.classList.add("content");
    postContent.innerHTML = post.content;
    postsForCategory.appendChild(postContent);
}


