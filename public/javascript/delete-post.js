// Define an asynchronous function to handle the click event of the "Delete post" button
async function deleteFormHandler(event) {
    event.preventDefault(); // Prevent the default click behavior

    // Extract the post's ID from the current URL
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a DELETE request to the server to delete the post
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE' // Use the DELETE HTTP method
    });

    if (response.ok) { // If the server responds with a status code in the range 200-299
        // Redirect the user to the dashboard page
        document.location.replace('/dashboard');
    } else { // If the server responds with a status code outside the range 200-299
        // Show an alert with the server's response status text
        alert(response.statusText);
    }
}

// Add a click event listener to the "Delete post" button that calls the deleteFormHandler function when the button is clicked
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
