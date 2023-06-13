// Define an asynchronous function to handle the submit event of the "Edit post" form
async function editFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract the post's title and content from the form fields
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    // Extract the post's ID from the current URL
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a PUT request to the server to update the post
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT', // Use the PUT HTTP method
        body: JSON.stringify({ // Include the updated title and content in the request body
            title,
            post_content
        }),
        headers: { // Specify that the request body is in JSON format
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) { // If the server responds with a status code in the range 200-299
        // Redirect the user to the dashboard page
        document.location.replace('/dashboard');
    } else { // If the server responds with a status code outside the range 200-299
        // Show an alert with the server's response status text
        alert(response.statusText);
    }
}

// Add a submit event listener to the "Edit post" form that calls the editFormHandler function when the form is submitted
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
