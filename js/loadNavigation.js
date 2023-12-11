document.addEventListener("DOMContentLoaded", () => {
  const navElement = document.querySelector("#nav-placeholder");
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    navElement.innerHTML = `
    <nav class="courseContainer">
      <div><a href="index.html"><img class="header-logo" src="/logo.webp" alt="" /></div></a>
      <div id="controls">
      <div>
        <input type="checkbox" class="checkbox" id="checkbox">
        <label for="checkbox" class="checkbox-label">
          <i class="fas fa-moon"></i>
          <i class="fas fa-sun"></i>
          <span class="ball"></span>
        </label>
      </div>
      <div id="user-profile">
      <i class="fa-solid fa-circle-user"></i>
      <div class="dropdown-menu">
        <a href="#" id="logout">Log ud</a>
        <!-- Tilføj yderligere menuvalg her om nødvendigt -->
      </div>
    </div>
      </div>
    </nav>
    `;
  } else {
    navElement.innerHTML = `
      <nav class="courseContainer">
          <div><a href="index.html"><img class="header-logo" src="/logo.webp" alt="" /></div></a>
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
  }

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("userToken");
      window.location.href = "index.html";
    });
  }
});


document.addEventListener("DOMContentLoaded", (event) => {
  var signUpBtn = document.querySelector("#signUp");
  var loginBtn = document.querySelector("#loginBtn");
  var createAccountBtn = document.querySelector("#createAccountBtn");

  // Bind the modal to the Sign Up button
  signUpBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor action
    buildModal("signup");
  });

  createAccountBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default button action
    buildModal("signup");
  });

  // Bind the modal to the Login button
  loginBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default button action
    buildModal("login");
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
    emailInput.setAttribute("id", "login-email");
    emailInput.setAttribute("placeholder", "E-mail");
    formContainer.appendChild(emailInput);

    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("id", "login-password");
    passwordInput.setAttribute("placeholder", "Password");
    formContainer.appendChild(passwordInput);

    var loginButton = document.createElement("button");
    loginButton.setAttribute("class", "form-button");
    loginButton.textContent = "Log In";
    loginButton.addEventListener("click", loginUser);
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
    emailInput.setAttribute("id", "signup-email");
    emailInput.setAttribute("placeholder", "E-mail");
    formContainer.appendChild(emailInput);

    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("id", "signup-password");
    passwordInput.setAttribute("placeholder", "Password");
    formContainer.appendChild(passwordInput);

    var signUpButton = document.createElement("button");
    signUpButton.setAttribute("class", "form-button");
    signUpButton.textContent = "Sign Up";
    signUpButton.addEventListener("click", signUpUser);
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

  async function loginUser() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    try {
      const response = await fetch(
        "https://hardskillstation-api.azurewebsites.net/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed: " + response.status);
      } else {
        alert("Login succesfuld!");
      }

      const userData = await response.json();
      localStorage.setItem("userToken", userData.token);

      // Generer et unikt ID baseret på den nuværende tid
      var uniqueID = "user-" + new Date().getTime();
      localStorage.setItem("userID", uniqueID);
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login fejl: " + error.message);
    }
  }

  async function signUpUser() {
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    // Valider email
    if (!validateEmail(email)) {
      alert("Indtast venligst en gyldig email-adresse.");
      return; // Stop funktionen, hvis emailen ikke er gyldig
    }

    try {
      const response = await fetch(
        "https://hardskillstation-api.azurewebsites.net/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // Tjek om yderligere felter kræves
        }
      );

      if (!response.ok) {
        const errorBody = await response.json(); // Hent detaljeret fejlbeskrivelse
        throw new Error(
          "Signup failed: " +
            response.status +
            " - " +
            JSON.stringify(errorBody)
        );
      }

      alert("Tilmelding succesfuld! Du kan nu logge ind.");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Tilmeldingsfejl: " + error.message); // Vis fejlmeddelelse til brugeren
    }

  // Funktion til at validere email
  function validateEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }
}
});
// JavaScript code to create a modal based on the content

// Function to build the modal
function buildEventModal(eventImg, eventName, eventDate, eventLocation, eventDescription) {
  
  var existingModal = document.getElementById("modal");
  if (existingModal) {
    existingModal.remove();
  }

  var modal = document.createElement("div");
  modal.setAttribute("id", "modal");
  modal.setAttribute("class", "modal");

  var modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");

  var closeBtn = document.createElement("span");
  closeBtn.setAttribute("class", "close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  modalContent.appendChild(closeBtn);

  var eventDetails = document.createElement("div");
  eventDetails.setAttribute("class", "event-details");

  var eventNameElement = document.createElement("h2");
  eventNameElement.textContent = eventName;
  eventDetails.appendChild(eventNameElement);

  var dateContainer = document.createElement("div");
  dateContainer.setAttribute("class", "eventInfoContainer");
  eventDetails.appendChild(dateContainer);
  
  var locationIconElement = document.createElement("i");
  locationIconElement.classList.add("fa-regular", "fa-calendar-days");
  dateContainer.appendChild(locationIconElement);

  var eventDateElement = document.createElement("p");
  eventDateElement.textContent = "Date: " + eventDate;
  dateContainer.appendChild(eventDateElement);

  var locationContainer = document.createElement("div");
  locationContainer.setAttribute("class", "eventInfoContainer");
  eventDetails.appendChild(locationContainer);

  var locationIconElement = document.createElement("i");
  locationIconElement.classList.add("fa-solid", "fa-location-dot");
  locationContainer.appendChild(locationIconElement);

  var eventLocationElement = document.createElement("p");
  eventLocationElement.textContent = "Location: " + eventLocation;
  locationContainer.appendChild(eventLocationElement);

  var eventDescriptionElement = document.createElement("p");
  eventDescriptionElement.textContent = eventDescription;
  eventDetails.appendChild(eventDescriptionElement);

  // Button for 'Tilmeld Dig' (Sign Up)
  var signUpButton = document.createElement("button");
  signUpButton.setAttribute("data-translate", "");
  signUpButton.setAttribute("class", "cta-1 modalButton modalcta-1");
  signUpButton.textContent = "Tilmeld Dig";
  eventDetails.appendChild(signUpButton);
  
   // Button for 'Se Alle Events' (See All Events)
  var seeAllEventsButton = document.createElement("button");
  seeAllEventsButton.setAttribute("data-translate", "");
  seeAllEventsButton.setAttribute("class", "cta-2 modalButton modalcta-2");
  seeAllEventsButton.textContent = "Se Alle Events";
  seeAllEventsButton.addEventListener("click", function() {
    modal.style.display = "none";
    var eventsContainer = document.getElementById("eventsContainer");
    if (eventsContainer) {
      eventsContainer.scrollIntoView({ behavior: "smooth" });
    }
  });
  eventDetails.appendChild(seeAllEventsButton);

  modalContent.appendChild(eventDetails);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  modal.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

