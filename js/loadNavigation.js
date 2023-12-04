document.addEventListener("DOMContentLoaded", (event) => {
  const navElement = document.querySelector("#nav-placeholder");
  navElement.innerHTML = `
      <nav class="courseCointainer">
        <div class="logo"><img src="" alt="" /></div>
        <div class="auth-buttons">
          <a class="signUp" id="signUp" href="">Sign up</a>
          <button id="loginBtn">Login</button>
        </div>
      </nav>
    `;
});


document.addEventListener('DOMContentLoaded', (event) => {
  var signUpBtn = document.querySelector('#signUp');
  var loginBtn = document.querySelector('#loginBtn');

  
  // Bind the modal to the Sign Up button
  signUpBtn.addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default anchor action
    buildModal('signup');
  });

  // Bind the modal to the Login button
  loginBtn.addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default button action
    buildModal('login');
  });
});

function buildModal(type) {
  // First, check if a modal already exists and remove it
  var existingModal = document.getElementById('modal');
  if (existingModal) {
    existingModal.remove();
  }

  // Create the modal container
  var modal = document.createElement('div');
  modal.setAttribute('id', 'modal');
  modal.setAttribute('class', 'modal');

  // Create the modal content container
  var modalContent = document.createElement('div');
  modalContent.setAttribute('class', 'modal-content');

  // Add the close button
  var closeBtn = document.createElement('span');
  closeBtn.setAttribute('class', 'close');
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };
  modalContent.appendChild(closeBtn);

  // Determine which form to display based on the type argument
  var form = (type === 'signup') ? buildSignUpForm() : buildLoginForm();
  modalContent.appendChild(form);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Display the modal
  modal.style.display = 'block';

  // Close the modal if the user clicks outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function buildLoginForm() {
  // Create login form elements based on the provided design
  var formContainer = document.createElement('div');
  formContainer.setAttribute('id', 'login-form');
  formContainer.setAttribute('class', 'form-container');

  var h2 = document.createElement('h2');
  h2.textContent = 'Log In';
  formContainer.appendChild(h2);

  var emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'E-mail');
  formContainer.appendChild(emailInput);

  var passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Password');
  formContainer.appendChild(passwordInput);

  var loginButton = document.createElement('button');
  loginButton.setAttribute('class', 'form-button');
  loginButton.textContent = 'Log In';
  // Add event listener for login logic here
  formContainer.appendChild(loginButton);

  var signUpToggle = document.createElement('a');
  signUpToggle.setAttribute('href', '#');
  signUpToggle.setAttribute('class', 'form-toggle');
  signUpToggle.textContent = "Don't have an account? Sign up";
  signUpToggle.onclick = function(event) {
    event.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    buildModal('signup');
  };
  formContainer.appendChild(signUpToggle);

  return formContainer;
}

function buildSignUpForm() {
  // Create signup form elements based on the provided design
  var formContainer = document.createElement('div');
  formContainer.setAttribute('id', 'signup-form');
  formContainer.setAttribute('class', 'form-container');

  var h2 = document.createElement('h2');
  h2.textContent = 'Sign Up';
  formContainer.appendChild(h2);

  var emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'E-mail');
  formContainer.appendChild(emailInput);

  var passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Password');
  formContainer.appendChild(passwordInput);

  var signUpButton = document.createElement('button');
  signUpButton.setAttribute('class', 'form-button');
  signUpButton.textContent = 'Sign Up';
  // Add event listener for signup logic here
  formContainer.appendChild(signUpButton);

  var loginToggle = document.createElement('a');
  loginToggle.setAttribute('href', '#');
  loginToggle.setAttribute('class', 'form-toggle');
  loginToggle.textContent = 'Already have an account? Log In';
  loginToggle.onclick = function(event) {
    event.preventDefault();
    document.getElementById('signup-form').style.display = 'none';
    buildModal('login');
  };
  formContainer.appendChild(loginToggle);

  return formContainer;
}

// Make sure to add the CSS rules for the classes used here.
