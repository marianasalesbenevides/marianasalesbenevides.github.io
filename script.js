document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const formResponse = document.createElement("div");
    formResponse.id = "form-response";
    formResponse.style.display = "none";
    formResponse.style.marginTop = "15px";
    contactForm.parentNode.insertBefore(formResponse, contactForm.nextSibling);

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    formResponse.style.display = "block";
                    formResponse.style.color = "green";
                    formResponse.textContent = "Mensagem enviada com sucesso!";
                    contactForm.reset();
                } else {
                    response.json().then((data) => {
                        if (data.errors) {
                            formResponse.style.display = "block";
                            formResponse.style.color = "red";
                            formResponse.textContent = data.errors
                                .map((error) => error.message)
                                .join(", ");
                        }
                    });
                }
            })
            .catch((error) => {
                formResponse.style.display = "block";
                formResponse.style.color = "red";
                formResponse.textContent =
                    "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.";
            });
    });
});
