// Definer API URL
const apiUrl = "https://hardskillstation-api.azurewebsites.net";

// Funktion til at hente og vise events
function loadEvents() {
  fetch(`${apiUrl}/event`)
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

  // Tilpas dette for at matche dit event data model og hvordan du vil vise det
  card.innerHTML = `
        <img src="${event.image}" alt="Event billede">
        <h3>${event.headline}</h3>
        <p>${event.summary}</p>
        <p>Dato: ${event.date}</p>
        <p>Sted: ${event.location}</p>
    `;
    
    card.addEventListener("click", function() {
        buildEventModal(event.image, event.headline, event.date, event.location, event.description);
      });
    return card;
}

// Kald denne funktion, når siden indlæses
document.addEventListener("DOMContentLoaded", loadEvents);

//Card slider
function handleScrollNext () {
  const cards = document.getElementById("eventsContainer");
  cards.scrollLeft=cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth /2 : window.innerWidth -100
}

function handleScrollPrev () {
  const cards = document.getElementById("eventsContainer");
  cards.scrollLeft=cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth /2 : window.innerWidth -100
}

function sliderInit() {
    const next=document.getElementById("next");
    const prev=document.getElementById("prev");
    next.addEventListener('click', handleScrollNext);
    prev.addEventListener('click', handleScrollPrev);
}
