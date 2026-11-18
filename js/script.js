// Označí stránku jako JavaScriptově aktivní; bez JS zůstane navigace vždy viditelná.
document.documentElement.classList.add("js");

// Mobilní navigace.
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
  function updateNavigationForViewport() {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) {
      mainNav.hidden = menuButton.getAttribute("aria-expanded") !== "true";
    } else {
      mainNav.hidden = false;
      menuButton.setAttribute("aria-expanded", "false");
    }
  }

  updateNavigationForViewport();
  window.addEventListener("resize", updateNavigationForViewport);

  menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mainNav.hidden = isOpen;
  });
}

// Odstraní diakritiku a velikost písmen, aby "Málaga" našlo i "malaga".
function normalizeText(text) {
  return text.toLocaleLowerCase("cs-CZ").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Vyhledávání měst na stránce Destinace.
const searchInput = document.querySelector("#destination-search");
const destinationCards = document.querySelectorAll(".destination-card");
const filterMessage = document.querySelector("#filter-message");

if (searchInput && destinationCards.length > 0 && filterMessage) {
  searchInput.addEventListener("input", function () {
    const searchText = normalizeText(searchInput.value.trim());
    let visibleCount = 0;

    destinationCards.forEach(function (card) {
      const cityName = normalizeText(card.dataset.name || "");
      const matches = cityName.includes(searchText);
      card.hidden = !matches;
      if (matches) visibleCount++;
    });

    filterMessage.textContent = "Počet nalezených měst: " + visibleCount;
  });
}

// Kalkulačka orientačního rozpočtu na stránce Plánování.
const budgetForm = document.querySelector("#budget-form");
const budgetResult = document.querySelector("#budget-result");

if (budgetForm && budgetResult) {
  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const days = Number(document.querySelector("#days").value);
    const dailyCost = Number(document.querySelector("#daily-cost").value);
    const people = Number(document.querySelector("#people").value);

    if (!Number.isFinite(days) || !Number.isFinite(dailyCost) || !Number.isFinite(people) ||
        days < 1 || days > 60 || dailyCost < 1 || dailyCost > 1000 || people < 1 || people > 20) {
      budgetResult.textContent = "Zadejte prosím platné hodnoty v uvedených rozmezích.";
      return;
    }

    const total = days * dailyCost * people;
    budgetResult.textContent = "Orientační rozpočet: " +
      total.toLocaleString("cs-CZ") + " € celkem.";
  });
}
