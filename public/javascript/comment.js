// Define an asynchronous function to handle the submission of a comment form
async function commentFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the comment's text from the textarea field, and trim any leading/trailing whitespace
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Extract the post's ID from the current URL
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) { // If there is comment text (i.e., the comment text is not an empty string after trimming)
        // Send a POST request to the server to create a new comment
        const response = await fetch('/api/comments', {
            method: 'POST', // Use the POST HTTP method
            body: JSON.stringify({ // Send the post's ID and the comment's text in the request body, in JSON format
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json' // Specify that the request body is in JSON format
            }
        });

        if (response.ok) { // If the server responds with a status code in the range 200-299
            document.location.reload(); // Reload the current page
        } else { // If the server responds with a status code outside the range 200-299
            alert(response.statusText); // Show an alert with the server's response status text
        }
    }
}

// Add an event listener to the comment form that calls the commentFormHandler function when the form is submitted
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
