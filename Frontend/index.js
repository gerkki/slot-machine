const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async function login() {

    userData = {
        username: loginUsername.value,
        password: loginPassword.value,
    }
});