// Define an asynchronous function to handle the click event of the "Create new post" button
async function createPostHandler(event) {
    event.preventDefault(); // Prevent the default click behavior

    // Redirect the user to the new post page
    document.location.replace('/dashboard/new')
}

// Add a click event listener to the "Create new post" button that calls the createPostHandler function when the button is clicked
document.querySelector('#create-new-post').addEventListener('click', createPostHandler);
