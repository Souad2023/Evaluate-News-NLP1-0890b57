// Replace checkForName with a function that checks the URL
function isValidURL(url) {
    const regex = /^(https?:\/\/)?([\w\-]+)+([\w\-.~:/?#[\]@!$&'()*+,;=.]+)$/;
    return regex.test(url);
}

// Define the server URL
const serverURL = 'http://localhost:5050'; 

// Get the form and bind the submit event to it
const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form behavior

    // Get the URL value from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    if (!isValidURL(formText)) {
        alert("Invalid URL! Please enter a valid URL.");
        return; // Stop execution if the URL is invalid
    }

    try {
        // Send the URL to the server using fetch
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ URI: formText }), // Send the URL in the body of the request
        });

        // Check the response
        if (!response.ok) {
            throw new Error("Failed to send URL to server");
        }

        const data = await response.json();
        console.log("Server Response:", data);

        // Display the result to the user
        alert(`Analysis result: ${JSON.stringify(data)}`);
    } catch (error) {
        console.error("Error:", error.message);
        alert("There was an error connecting to the server.");
    }
}

// Export the handleSubmit function for external use
export { handleSubmit };
