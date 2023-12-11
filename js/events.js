// Definer API URL
const apiUrl = "https://hardskillstation-api.azurewebsites.net";

function languageChecker() {
  let pageLangguage = document.documentElement.lang;
  if (pageLangguage == "da") {
    loadEvents("danish");
  } else {
    loadEvents("english");
  }
}

// Funktion til at hente og vise events
function loadEvents(lang) {
  fetch(`${apiUrl}/events/${lang}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((events) => {
      const container = document.getElementById("eventsContainer");
      events.forEach((event) => {
        const card = createEventCard(event);
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Fejl ved indlæsning af events:", error));

  sliderInit();
}

// Funktion til at oprette et kort for et event
function createEventCard(event) {
  const card = document.createElement("div");
  card.className = "event-card";

  const formattedDate = formatDate(event.date);

  // Tilpas dette for at matche dit event data model og hvordan du vil vise det
  card.innerHTML = `
        <img src="${event.image}" alt="Event billede">
        <h3>${event.headline}</h3>
        <p>${event.summary}</p>
        <div class="eventInfoContainer">
        <i class="fa-regular fa-calendar-days previewIcon"></i>
        <p>${formattedDate}</p>
        </div>
        <div class="eventInfoContainer">
        <i class="fa-solid fa-location-dot previewIcon"></i>
        <p>${event.location}</p>
        </div>
    `;

  card.addEventListener("click", function () {
    buildEventModal(
      event.image,
      event.headline,
      event.date,
      event.location,
      event.description
    );
  });
  return card;
}

// Kald denne funktion, når siden indlæses
document.addEventListener("DOMContentLoaded", languageChecker);

//Card slider
function handleScrollNext() {
  const cards = document.getElementById("eventsContainer");
  cards.scrollLeft = cards.scrollLeft +=
    window.innerWidth / 2 > 600
      ? window.innerWidth / 2
      : window.innerWidth - 100;
}

function handleScrollPrev() {
  const cards = document.getElementById("eventsContainer");
  cards.scrollLeft = cards.scrollLeft -=
    window.innerWidth / 2 > 600
      ? window.innerWidth / 2
      : window.innerWidth - 100;
}

function sliderInit() {
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  next.addEventListener("click", handleScrollNext);
  prev.addEventListener("click", handleScrollPrev);
}
function formatDate(date) {
  const eventDate = new Date(date);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = `${eventDate.getDate().toString().padStart(2, "0")}/${(
    eventDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${eventDate.getFullYear()}, ${eventDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${eventDate.getMinutes().toString().padStart(2, "0")}`;
  return formattedDate;
}
