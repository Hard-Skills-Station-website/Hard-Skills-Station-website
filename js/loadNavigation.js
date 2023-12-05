document.addEventListener("DOMContentLoaded", () => {
  const navElement = document.querySelector("#nav-placeholder");
  navElement.innerHTML = `
      <nav class="courseContainer">
          <div><a href="index.html"><img class="header-logo" src="/logo.webp" alt="" /></div></a>
          <div class="language-switch">
          <img src="/denmark.png" alt="Dansk" id="switchToDanish" />
          <img src="/united-kingdom.png" alt="English" id="switchToEnglish" />
          </div>
          <div id="controls">
          <div>
            <input type="checkbox" class="checkbox" id="checkbox">
            <label for="checkbox" class="checkbox-label">
              <i class="fas fa-moon"></i>
              <i class="fas fa-sun"></i>
              <span class="ball"></span>
            </label>
          </div>
            
          <div class="auth-buttons">
                <a class="signUp" id="signUp" href="">Sign up</a>
                <button id="loginBtn">Login</button>
          </div>
          </div>
      </nav>
  `;

  // Indlæs og anvend det gemte sprogvalg
  const savedLanguage = localStorage.getItem("preferredLanguage") || "en"; // Antager engelsk som standardsprog
  if (savedLanguage !== "en") {
    switchLanguage(savedLanguage);
  }

  // Tilføj event listeners for sprogskifte
  document
    .getElementById("switchToDanish")
    .addEventListener("click", () => setLanguage("da"));
  document
    .getElementById("switchToEnglish")
    .addEventListener("click", () => setLanguage("en"));
});

async function translateText(text, targetLanguage) {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=AIzaSyAJBfEv4mdoP0Zm3HgSGai1CCDfIkf9CsM`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage, // Sørg for, at dette felt er korrekt angivet
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return text;
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error during translation", error);
    return text;
  }
}

function setLanguage(language) {
  switchLanguage(language);
  localStorage.setItem("preferredLanguage", language);
}

function switchLanguage(targetLang) {
  document.querySelectorAll("[data-translate]").forEach(async (element) => {
    // Gem det oprindelige indhold af spans og erstat dem i teksten
    const spans = Array.from(element.querySelectorAll("span"));
    const spanPlaceholders = spans.map((span, index) => {
      element.replaceChild(document.createTextNode(`__SPAN_${index}__`), span);
      return span.outerHTML; // Gemmer det oprindelige HTML for span
    });

    const translatedText = await translateText(element.textContent, targetLang);

    // Sæt span indholdet tilbage i den oversatte tekst
    let updatedText = translatedText;
    spanPlaceholders.forEach((html, index) => {
      updatedText = updatedText.replace(`__SPAN_${index}__`, html);
    });

    element.innerHTML = updatedText;
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  var signUpBtn = document.querySelector("#signUp");
  var loginBtn = document.querySelector("#loginBtn");

  // Bind the modal to the Sign Up button
  signUpBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor action
    buildModal("signup");
  });

  // Bind the modal to the Login button
  loginBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default button action
    buildModal("login");
  });
});

function buildModal(type) {
  // First, check if a modal already exists and remove it
  var existingModal = document.getElementById("modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create the modal container
  var modal = document.createElement("div");
  modal.setAttribute("id", "modal");
  modal.setAttribute("class", "modal");

  // Create the modal content container
  var modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");

  // Add the close button
  var closeBtn = document.createElement("span");
  closeBtn.setAttribute("class", "close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  modalContent.appendChild(closeBtn);

  // Determine which form to display based on the type argument
  var form = type === "signup" ? buildSignUpForm() : buildLoginForm();
  modalContent.appendChild(form);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Display the modal
  modal.style.display = "block";

  // Close the modal if the user clicks outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function buildLoginForm() {
  // Create login form elements based on the provided design
  var formContainer = document.createElement("div");
  formContainer.setAttribute("id", "login-form");
  formContainer.setAttribute("class", "form-container");

  var h2 = document.createElement("h2");
  h2.textContent = "Log In";
  formContainer.appendChild(h2);

  var emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("placeholder", "E-mail");
  formContainer.appendChild(emailInput);

  var passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("placeholder", "Password");
  formContainer.appendChild(passwordInput);

  var loginButton = document.createElement("button");
  loginButton.setAttribute("class", "form-button");
  loginButton.textContent = "Log In";
  // Add event listener for login logic here
  formContainer.appendChild(loginButton);

  var signUpToggle = document.createElement("a");
  signUpToggle.setAttribute("href", "#");
  signUpToggle.setAttribute("class", "form-toggle");
  signUpToggle.textContent = "Don't have an account? Sign up";
  signUpToggle.onclick = function (event) {
    event.preventDefault();
    document.getElementById("login-form").style.display = "none";
    buildModal("signup");
  };
  formContainer.appendChild(signUpToggle);

  return formContainer;
}

function buildSignUpForm() {
  // Create signup form elements based on the provided design
  var formContainer = document.createElement("div");
  formContainer.setAttribute("id", "signup-form");
  formContainer.setAttribute("class", "form-container");

  var h2 = document.createElement("h2");
  h2.textContent = "Sign Up";
  formContainer.appendChild(h2);

  var emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("placeholder", "E-mail");
  formContainer.appendChild(emailInput);

  var passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("placeholder", "Password");
  formContainer.appendChild(passwordInput);

  var signUpButton = document.createElement("button");
  signUpButton.setAttribute("class", "form-button");
  signUpButton.textContent = "Sign Up";
  // Add event listener for signup logic here
  formContainer.appendChild(signUpButton);

  var loginToggle = document.createElement("a");
  loginToggle.setAttribute("href", "#");
  loginToggle.setAttribute("class", "form-toggle");
  loginToggle.textContent = "Already have an account? Log In";
  loginToggle.onclick = function (event) {
    event.preventDefault();
    document.getElementById("signup-form").style.display = "none";
    buildModal("login");
  };
  formContainer.appendChild(loginToggle);

  return formContainer;
}
