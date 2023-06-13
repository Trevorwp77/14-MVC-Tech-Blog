// Define a function to format a date
function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`; // Return the date formatted as MM/DD/YYYY
}

module.exports = {
    formatDate // Export the formatDate function so it can be used in other files
}
