const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");
const errorMessage = document.getElementById("error-message");

loginButton.addEventListener("click", async function login() {

    let userData = {
        username: loginUsername.value,
        password: loginPassword.value,
    }

    let request = new Request(`http://localhost:8000/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" }
    })

    fetch(request).then(fulfill)

    async function fulfill(response) {
        if (response.status === 200) {
            let user = await response.json();
            loadTheBandit(user);
        }
        if (response.status === 400) {
            errorMessage.textContent = "Missing username or password";
            errorMessage.style.color = "red";
        }
        if (response.status === 401) {
            errorMessage.textContent = "Incorrect username or password";
            errorMessage.style.color = "red";
        }

    }
});

async function loadTheBandit(user) {

}