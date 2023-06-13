// Define an asynchronous function to handle the submission of a new post form
async function newFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the post's title from the input field
    const title = document.querySelector('input[name="post-title"]').value;
    // Get the post's content from the textarea field, and trim any leading/trailing whitespace
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    // Send a POST request to the server to create a new post
    const response = await fetch(`/api/posts`, {
        method: 'POST', // Use the POST HTTP method
        body: JSON.stringify({ // Send the post's title and content in the request body, in JSON format
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json' // Specify that the request body is in JSON format
        }
    });

    if (response.ok) { // If the server responds with a status code in the range 200-299
        document.location.replace('/dashboard'); // Redirect the user to the dashboard page
    } else { // If the server responds with a status code outside the range 200-299
        alert(response.statusText); // Show an alert with the server's response status text
    }
}

// Add an event listener to the new post form that calls the newFormHandler function when the form is submitted
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
