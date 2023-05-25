async function handleRegisterClick(e) {
    e.preventDefault();
    
    const alias = document.getElementById("alias").value;
    // Status("Starting registering...");

    const p = new Passwordless.Client({
        apiKey: API_KEY
    });

    const backendRequest = await fetch(
        BACKEND_URL + "/create-token?alias=" + alias
    );
    const backendResponse = await backendRequest.json();
    if (!backendRequest.ok) {
        console.log("Our backend failed while creating a token: ");
        return;
    }
    const { token, error } = await p.register(backendResponse.token);
}

document
    .getElementById("passwordless-register")