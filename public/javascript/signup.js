// Define an asynchronous function to handle the signup form submission
async function signupFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission action

    // Trim any leading or trailing whitespace from the input fields and store the values
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Check if both username and password are non-empty
    if (username && password) {
        // Send a POST request to the server to create a new user
        const response = await fetch('/api/users', {
            method: 'post', // Use the POST HTTP method
            body: JSON.stringify({ // Specify the request body content
                username,
                password
            }),
            headers: { // Specify that the request body is in JSON format
                'Content-Type': 'application/json'
            }
        });

        // If the server responds with a status code in the range 200-299
        if (response.ok) {
            // Redirect the user to the dashboard page
            document.location.replace('/dashboard');
        } else { // If the server responds with a status code outside the range 200-299,
            // Show an alert with the server's response status text
            alert(response.statusText);
        }
    }
}

// Add a submit event listener to the signup form that calls the signupFormHandler function when the form is submitted
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
