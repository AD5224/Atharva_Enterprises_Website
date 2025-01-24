document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        submitButton.disabled = true; // Disable the button to prevent multiple submissions
        submitButton.textContent = "Submitting...";

        const formData = new FormData(form);

        fetch('http://localhost:3000/contact', { // Update with correct backend URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message); // Show success message
                    form.reset(); // Reset the form
                } else {
                    alert(data.message || "An error occurred. Please try again.");
                }
            })
            .catch(error => {
                alert("An error occurred. Please try again later.");
                console.error("Error submitting form:", error);
            })
            .finally(() => {
                submitButton.disabled = false; // Re-enable the button
                submitButton.textContent = "Submit";
            });
    });

    // Load map details from the backend
    fetch('http://localhost:3000/map')
        .then(response => response.json())
        .then(data => {
            const mapContainer = document.getElementById('map-container');
            const { location, address, coordinates } = data;

            // Update the UI with map details
            mapContainer.innerHTML = `
                <h3>${location}</h3>
                <p>${address}</p>
                <p>Coordinates: Latitude ${coordinates.lat}, Longitude ${coordinates.lng}</p>
            `;
        })
        .catch(error => {
            console.error("Error loading map details:", error);
        });
});
