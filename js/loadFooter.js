document.addEventListener("DOMContentLoaded", (event) => {
  const footerElement = document.querySelector("#footer-placeholder");
  footerElement.innerHTML = `
<div class="flex-footer">
  <div class="footer-logo">
    <img src="logo.webp" alt="Hard Skill Station Logo" />
    <p>By campus kolding</p>
    </div>
    <!-- Contact info and social media links -->
    <div class="contact-info">
    <p>Do you have any questions or suggestions for events?</p>
      <p>
        Contact person for Hard Skills Station: Biljana Seier, project manager
        bcse@iba.dk
      </p>
    </div>
    <div class="social-media-links">
      <!-- Social media icons with links -->
    </div>
    </div>`;
});
