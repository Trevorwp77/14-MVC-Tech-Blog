// Define an asynchronous function to handle the logout process
async function logout() {
    // Send a POST request to the server to log out the user
    const response = await fetch('/api/users/logout', {
        method: 'post', // Use the POST HTTP method
        headers: { // Specify that the request body is in JSON format
            'Content-Type': 'application/json'
        }
    });

    // If the server responds with a status code in the range 200-299,
    if (response.ok) {
        // Redirect the user to the home page
        document.location.replace('/');
    } else { // If the server responds with a status code outside the range 200-299,
        // Show an alert with the server's response status text
        alert(response.statusText);
    }
}

// Add a click event listener to the logout button that calls the logout function when the button is clicked
document.querySelector('#logout').addEventListener('click', logout);
