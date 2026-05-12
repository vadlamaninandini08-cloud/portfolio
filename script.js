document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if(response.ok) {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        } else {
            alert('Error: Could not send message');
        }
    } catch (error) {
        alert('Error: Server not ready yet');
    }
});
