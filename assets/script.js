//VALIDACION MAIL
const contactForm = document.getElementById("contactForm");
const inputs = Array.from(
  contactForm.querySelectorAll(".form-control input, .form-control textarea")
);

contactForm.addEventListener("submit", function (event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});

inputs.forEach((input) => {
  input.addEventListener("input", function () {
    validateInput(input);
  });

  input.addEventListener("blur", function () {
    validateInput(input);
  });
});

function validateForm() {
  return inputs.every(validateInput);
}

function validateInput(input) {
  const formControl = input.parentElement;
  const value = input.value.trim();
  const isValid = validateValue(input, value);

  if (isValid) {
    showSuccess(formControl);
  } else {
    showError(formControl, getErrorMessage(input));
  }

  return isValid;
}

function validateValue(input, value) {
  if (input.id === "name" || input.id === "lastname") {
    return value !== "" && !/\d/.test(value);
  }

  if (input.id === "email") {
    return isValidEmail(value);
  }

  if (input.id === "phone") {
    return isValidPhone(value);
  }

  if (input.id === "comments") {
    return value.length >= 50;
  }

  return true;
}

function getErrorMessage(input) {
  if (input.id === "name" || input.id === "lastname") {
    return "El campo es obligatorio y no debe contener números.";
  }

  if (input.id === "email") {
    return "Ingrese un email válido.";
  }

  if (input.id === "phone") {
    return "Ingrese un número de teléfono válido.";
  }

  if (input.id === "comments") {
    return "El mensaje debe tener al menos 50 caracteres.";
  }

  return "";
}

function showError(formControl, message) {
  formControl.classList.add("error");
  formControl.classList.remove("success");
  formControl.querySelector("small").textContent = message;
}

function showSuccess(formControl) {
  formControl.classList.remove("error");
  formControl.classList.add("success");
  formControl.querySelector("small").textContent = "";
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone);
}
