document
    .getElementById("subscribeForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        var emailInput = document.getElementById("emailInput");
        var emailValue = emailInput.value;

        if (validateEmail(emailValue)) {
            alert("Email has been successfully subscribed to");
            emailInput.value = "";
        } else {
            alert("Please enter a valid email address");
        }
    });

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
