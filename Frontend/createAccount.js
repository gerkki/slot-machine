const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const createButton = document.getElementById("create-button");
const message = document.getElementById("message");

createButton.addEventListener("click", async function createAccount() {
    let userData = {
        username: loginUsername.value,
        password: loginPassword.value,
    }
    let request = new Request(`http://localhost:8000/create`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" }
    })

    fetch(request).then(fulfill)

    async function fulfill(response) {
        if (response.status === 200) {
            message.textContent = "Account has been created.";
        }
        if (response.status === 400) {
            message.textContent = "Missing username or password.";
            message.style.color = "red";
        }
        if (response.status === 409) {
            message.textContent = "User already exists.";
            message.style.color = "red";
        }
    }
});