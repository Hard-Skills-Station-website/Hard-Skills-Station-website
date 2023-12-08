document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("switchToEnglish").addEventListener("click", () => {
    translatePage("EN");
  });

  document.getElementById("switchToDanish").addEventListener("click", () => {
    translatePage("DA");
  });

  async function translatePage(targetLang) {
    if (targetLang === "DA") {
      location.reload(); // Reload the page
    } else {
      const elements = collectTextElements(document.body);

      for (const element of elements) {
        const htmlContent = element.innerHTML;

        try {
          const response = await fetch("http://localhost:3000/translate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: htmlContent, targetLang }),
          });

          const data = await response.json();
          element.innerHTML = data.translations[0].text; // Update the HTML content of the element
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  }

  function collectTextElements(element, elements = []) {
    for (const node of element.childNodes) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() !== "script" &&
        node.tagName.toLowerCase() !== "style"
      ) {
        if (node.textContent.trim() !== "") {
          elements.push(node);
        }
        collectTextElements(node, elements);
      }
    }
    return elements;
  }
});
