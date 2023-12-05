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
    <p data-translate>Do you have any questions or suggestions for events?</p>
      <p id="contactPerson" data-translate>
        Contact person for Hard Skills Station: Biljana Seier, project manager
        <a id="contactEmail" href="mailto:bcse@iba.dk">bcse@iba.dk</a>
      </p>
      <div class="social-media-links">
        <a href="https://www.facebook.com/hardskillsstation" target="_blank"><i class="fa-brands fa-facebook"></i></a>
        <a href="https://www.youtube.com/channel/UCVoNPMFDzk6pY_36EAAo-BQ" target="_blank"><i class="fa-brands fa-youtube"></i></a>
      </div>
  </div>
</div>`;
});
