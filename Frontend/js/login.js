const loginForm = document.getElementById("login-form");

const loginMessage = document.getElementById("login-message");


loginForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;


    if (email === "admin@smartstock.com" && password === "123456") {

        loginMessage.textContent = "Login realizado com sucesso!";

        loginMessage.style.color = "green";

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1000);

    } else {

        loginMessage.textContent =
            "E-mail ou senha incorretos.";

        loginMessage.style.color = "red";

    }

});