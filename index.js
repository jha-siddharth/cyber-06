const correctPassword = "Abes@2030";
const maxAttempts = 3;


// LOGIN FUNCTIONALITY

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const password = document.getElementById("password").value;

        let attempts = Number(localStorage.getItem("attempts")) || 0;

        const message = document.getElementById("message");


        if (attempts >= maxAttempts) {

            message.textContent =
                "Access Denied! Maximum attempts reached.";

            return;
        }


        if (password === correctPassword) {

            localStorage.setItem("authenticated", "true");

            localStorage.removeItem("attempts");

            window.location.href = "main.html";

        }

        else {

            attempts++;

            localStorage.setItem("attempts", attempts);


            if (attempts >= maxAttempts) {

                message.textContent =
                    "Access Denied! Maximum attempts reached.";

            }

            else {

                message.textContent =
                    "Incorrect Password! Attempts left: " +
                    (maxAttempts - attempts);

            }

        }

    });

}



// VAULT AUTHENTICATION

if (window.location.pathname.endsWith("/main.html") ||
    window.location.pathname.endsWith("main.html")) {

    if (localStorage.getItem("authenticated") !== "true") {

        window.location.href = "index.html";

    }

}



// SAVE NOTES

function storeText() {

    const content = document.getElementById("privateText").value;

    localStorage.setItem("savedNotes", content);

    document.getElementById("statusText").textContent =
        "Notes saved successfully!";

}



// LOAD NOTES

function retrieveText() {

    const content = localStorage.getItem("savedNotes") || "";

    document.getElementById("privateText").value = content;

    document.getElementById("statusText").textContent =
        "Notes loaded successfully!";

}



// DELETE NOTES

function removeText() {

    document.getElementById("privateText").value = "";

    localStorage.removeItem("savedNotes");

    document.getElementById("statusText").textContent =
        "Notes deleted successfully!";

}



// LOGOUT

function exitVault() {

    localStorage.removeItem("authenticated");

    window.location.href = "index.html";

}