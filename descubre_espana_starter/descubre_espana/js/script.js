// Mobilní navigace: tlačítkem lze skrýt nebo zobrazit nabídku.
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
  // Na menších obrazovkách se nabídka zpočátku schová; bez JavaScriptu zůstane viditelná.
  if (window.innerWidth <= 900) {
    mainNav.hidden = true;
  }

  menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mainNav.hidden = isOpen;
  });
}

// Vyhledávání měst na stránce Destinace.
const searchInput = document.querySelector("#destination-search");
const destinationCards = document.querySelectorAll(".destination-card");
const filterMessage = document.querySelector("#filter-message");

if (searchInput && destinationCards.length > 0) {
  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    destinationCards.forEach(function (card) {
      const cityName = card.dataset.name;
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

    if (days < 1 || dailyCost < 1 || people < 1) {
      budgetResult.textContent = "Zadejte prosím kladné hodnoty.";
      return;
    }

    const total = days * dailyCost * people;
    budgetResult.textContent = "Orientační rozpočet: " +
      total.toLocaleString("cs-CZ") + " € celkem.";
  });
}
