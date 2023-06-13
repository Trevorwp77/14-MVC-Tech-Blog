// Define an asynchronous function to handle the submit event of the "Log In" form
async function loginFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract the username and password from the form fields
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // If both the username and password are provided,
    if (username && password) {
        // Send a POST request to the server to log in
        const response = await fetch('/api/users/login', {
            method: 'post', // Use the POST HTTP method
            body: JSON.stringify({ // Include the username and password in the request body
                username,
                password
            }),
            headers: { // Specify that the request body is in JSON format
                'Content-Type': 'application/json'
            }
        });

        // If the server responds with a status code in the range 200-299,
        if (response.ok) {
            // Redirect the user to the dashboard page
            document.location.replace('/dashboard');
        } else { // If the server responds with a status code outside the range 200-299,
            // Show an alert with the server's response status text
            alert(response.statusText);
        }
    }
}

// Add a submit event listener to the "Log In" form that calls the loginFormHandler function when the form is submitted
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
