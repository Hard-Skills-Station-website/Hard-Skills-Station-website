document.addEventListener("DOMContentLoaded", (event) => {
  const navElement = document.querySelector("#nav-placeholder");
  navElement.innerHTML = `
      <nav class="courseCointainer">
        <div class="logo"><img src="" alt="" /></div>
        <div class="auth-buttons">
          <a href="">Sign up</a>
          <button>Login</button>
        </div>
      </nav>
    `;
});
