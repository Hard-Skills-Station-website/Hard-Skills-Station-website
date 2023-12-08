function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const footer = document.querySelector("footer");
    const main = document.querySelector(".main-header");
    
    if (body.classList.contains('dark-mode')) {
        footer.style.background = "url('/footerheroReverse.png')";
        main.style.background = "url('/mainheroReverse.png') no-repeat center";
    } else {
        footer.style.background = "url('/footerhero.png')";
        main.style.background = "url('/mainhero.png') no-repeat center";
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    const checkbox = document.getElementById("checkbox");
    checkbox.addEventListener("change", toggleDarkMode);
  });
  